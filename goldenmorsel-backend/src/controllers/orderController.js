import mongoose from 'mongoose'
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { updateInventoryOnPayment } from '../services/inventoryService.js';
import { sendOrderConfirmation, sendPaymentConfirmation } from '../services/whatsappService.js';
import { sendPaymentConfirmationEmail } from '../services/emailService.js';

// CREATE guest order
export const createOrder = asyncHandler(async (req, res) => {
  const { guestInfo, items } = req.body;

  if (!guestInfo || !items || items.length === 0) {
    throw new AppError('Invalid order data', 400);
  }

  if (!guestInfo.name || !guestInfo.phone) {
    throw new AppError('Customer name and phone required', 400);
  }

  const requiredFields = ['name', 'phone', 'address'];
  for (const field of requiredFields) {
    if (!guestInfo[field]) {
      throw new AppError(`Customer ${field} is required`, 400);
    }
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
  try {
    await sendOrderConfirmation(order);
  } catch (error) {
    console.error('❌ WhatsApp notification failed:', error.message);
  }

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      orderId: order.orderId,
      total:   order.total,
      status:  order.status
    }
  });
});

// GET order by ID (handles both MongoDB _id and orderId field)
export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const order = await Order.findOne({
    $or: [
      { orderId },
      { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null }
    ]
  })

  if (!order) throw new AppError('Order not found', 404)

  res.status(200).json({ success: true, data: order })
})

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

// UPDATE order status (Admin) — handles both MongoDB _id and orderId field
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;

  const validStatuses = ['pending', 'confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const order = await Order.findOneAndUpdate(
    {
      $or: [
        { orderId: req.params.orderId },
        { _id: mongoose.Types.ObjectId.isValid(req.params.orderId) ? req.params.orderId : null }
      ]
    },
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

  // ── Side effects when payment confirmed ──────────────────────
  if (status === 'paid') {
    try {
      await updateInventoryOnPayment(order, req.adminId);
      console.log(`✓ Inventory updated for order ${order.orderId}`);
    } catch (error) {
      console.error('❌ Inventory update error:', error.message);
    }

    try {
      await sendPaymentConfirmation(order);
      console.log(`✓ WhatsApp notification sent for order ${order.orderId}`);
    } catch (error) {
      console.error('❌ WhatsApp notification error:', error.message);
    }

    try {
      if (order.guestInfo.email) {
        await sendPaymentConfirmationEmail(order);
        console.log(`✓ Email notification sent for order ${order.orderId}`);
      }
    } catch (error) {
      console.error('❌ Email notification error:', error.message);
    }
  }

  res.status(200).json({
    success: true,
    message: 'Order status updated',
    data: order
  });
});

// GET order by orderId reference (e.g. ORD-202602-0005)
export const getOrderByReference = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId })

  if (!order) {
    throw new AppError('Order not found', 404)
  }

  res.status(200).json({
    success: true,
    data: order
  })
})