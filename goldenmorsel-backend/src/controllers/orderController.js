import Order from '../models/Order.js';
import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { updateInventoryOnPayment } from '../services/inventoryService.js';
import { sendOrderConfirmation } from '../services/whatsappService.js';

// CREATE guest order
export const createOrder = asyncHandler(async (req, res) => {
  const { guestInfo, items } = req.body;

  // Validate
  if (!guestInfo || !items || items.length === 0) {
    throw new AppError('Invalid order data', 400);
  }

  if (!guestInfo.name || !guestInfo.phone) {
    throw new AppError('Customer name and phone required', 400);
  }

  // Verify stock
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      throw new AppError(`${item.title} is out of stock`, 400);
    }
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vat = subtotal * (process.env.VAT_PERCENTAGE / 100 || 0.06);
  const shipping = subtotal >= (process.env.FREE_SHIPPING_ABOVE || 200) ? 0 : (process.env.SHIPPING_COST || 0);
  const total = subtotal + vat + shipping;

  // Create order
  const order = await Order.create({
    guestInfo,
    items,
    subtotal,
    vat,
    vatPercentage: process.env.VAT_PERCENTAGE || 6,
    shipping,
    total,
    paymentMethod: 'whatsapp',
    status: 'pending'
  });

  // Send WhatsApp confirmation
  await sendOrderConfirmation(order);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      orderId: order.orderId,
      total: order.total,
      status: order.status
    }
  });
});

// GET order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId })
    .populate('items.productId', 'title price');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// GET orders by phone (track)
export const trackOrderByPhone = asyncHandler(async (req, res) => {
  const { phone } = req.params;

  const orders = await Order.find({ 'guestInfo.phone': phone })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// UPDATE order status (Admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;

  const validStatuses = ['pending', 'confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    {
      status,
      internalNotes: notes,
      ...(status === 'paid' && { paidAt: new Date(), paymentStatus: 'paid' })
    },
    { new: true }
  );

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Order status updated',
    data: order
  });
});