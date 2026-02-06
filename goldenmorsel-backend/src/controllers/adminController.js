import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import InventoryLog from '../models/InventoryLog.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { updateInventoryOnPayment } from '../services/inventoryService.js';

// GET dashboard stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const paidOrders = await Order.countDocuments({ paymentStatus: 'paid' });
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const totalProducts = await Product.countDocuments({ active: true });
  const totalUsers = await User.countDocuments();

  const revenueData = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);

  const totalRevenue = revenueData[0]?.total || 0;

  res.status(200).json({
    success: true,
    data: {
      orders: {
        total: totalOrders,
        paid: paidOrders,
        pending: pendingOrders
      },
      products: totalProducts,
      users: totalUsers,
      revenue: totalRevenue
    }
  });
});

// GET all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, limit = 20, page = 1 } = req.query;

  let filter = {};
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    pages: Math.ceil(total / limit),
    data: orders
  });
});

// CONFIRM payment
export const confirmPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { reference, notes } = req.body;

  const order = await Order.findOne({ orderId });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.paymentStatus === 'paid') {
    throw new AppError('Payment already confirmed', 400);
  }

  // Update order
  order.paymentStatus = 'paid';
  order.status = 'paid';
  order.paidAt = new Date();
  order.paymentReference = reference || 'Manual confirmation';
  order.internalNotes = notes || '';
  await order.save();

  // Update inventory
  await updateInventoryOnPayment(order);

  res.status(200).json({
    success: true,
    message: 'Payment confirmed and inventory updated',
    data: order
  });
});

// GET analytics
export const getAnalytics = asyncHandler(async (req, res) => {
  // Monthly sales
  const last12Months = [];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const year = date.getFullYear();
    const month = date.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const sales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      }
    ]);

    last12Months.push({
      month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
      sales: sales[0]?.total || 0,
      orders: sales[0]?.count || 0
    });
  }

  res.status(200).json({
    success: true,
    data: {
      monthlySales: last12Months
    }
  });
});