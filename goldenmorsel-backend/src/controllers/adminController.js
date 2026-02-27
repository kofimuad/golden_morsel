import Order from '../models/Order.js';
import mongoose from 'mongoose'
import Product from '../models/Product.js';
import User from '../models/User.js';
import Admin from '../models/Admin.js'
import { sendPaymentConfirmation } from '../services/whatsappService.js';
import { sendPaymentConfirmationEmail } from '../services/emailService.js';
import InventoryLog from '../models/InventoryLog.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { updateInventoryOnPayment } from '../services/inventoryService.js';

// GET dashboard stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalOrders   = await Order.countDocuments()
  const paidOrders    = await Order.countDocuments({ paymentStatus: 'paid' })
  const pendingOrders = await Order.countDocuments({ status: 'pending' })
  const totalProducts = await Product.countDocuments({ active: true })
  const totalUsers    = await User.countDocuments()

  const revenueData = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ])
  const totalRevenue = revenueData[0]?.total || 0

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(6)

  const lowStockAlerts = await Product.find({
    $expr: { $lte: ['$stock', '$lowStockThreshold'] },
    active: true
  }).select('title stock lowStockThreshold image')

  res.status(200).json({
    success: true,
    data: {
      orders:        { total: totalOrders, paid: paidOrders, pending: pendingOrders },
      products:      totalProducts,
      users:         totalUsers,
      revenue:       totalRevenue,
      recentOrders,
      lowStockAlerts,
    }
  })
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

  const order = await Order.findOne({
    $or: [
      { orderId },
      { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null }
    ]
  })

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
  try {
    await updateInventoryOnPayment(order, req.adminId);
  } catch (error) {
    console.error('Inventory update error:', error.message);
    // Don't throw - order is already paid
  }

  // Send WhatsApp notification to customer
  try {
    await sendPaymentConfirmation(order);
  } catch (error) {
    console.error('WhatsApp notification error:', error.message);
  }

  // Send email notification
  try {
    await sendPaymentConfirmationEmail(order);
  } catch (error) {
    console.error('Email notification error:', error.message);
  }

  res.status(200).json({
    success: true,
    message: 'Payment confirmed and inventory updated',
    data: order
  });
});

// GET analytics
export const getAnalytics = asyncHandler(async (req, res) => {
  const { period = '30d' } = req.query

  // Calculate date range
  const days = period === '7d' ? 7 : period === '90d' ? 90 : 30
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // KPIs
  const orders = await Order.find({
    createdAt: { $gte: startDate },
    paymentStatus: 'paid'
  })

  const totalRevenue    = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders     = orders.length
  const avgOrderValue   = totalOrders ? totalRevenue / totalOrders : 0
  const uniqueCustomers = new Set(orders.map(o => o.guestInfo?.phone).filter(Boolean)).size

  // Chart data — group by day
  const chartMap = {}
  orders.forEach(order => {
    const label = new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    if (!chartMap[label]) chartMap[label] = { label, revenue: 0, orders: 0 }
    chartMap[label].revenue += order.total
    chartMap[label].orders  += 1
  })
  const chart = Object.values(chartMap).slice(-days)

  // Top products
  const productMap = {}
  orders.forEach(order => {
    order.items?.forEach(item => {
      const id = item.productId?.toString() || item.title
      if (!productMap[id]) {
        productMap[id] = {
          title:     item.title,
          image:     item.image,
          unitsSold: 0,
          revenue:   0,
        }
      }
      productMap[id].unitsSold += item.quantity
      productMap[id].revenue   += item.price * item.quantity
    })
  })
  const topProducts = Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Orders by status (all time)
  const allStatuses  = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
  const statusCounts = await Promise.all(
    allStatuses.map(async s => ({
      status: s,
      count:  await Order.countDocuments({ status: s })
    }))
  )
  const totalAllOrders = statusCounts.reduce((sum, s) => sum + s.count, 0)
  const ordersByStatus = statusCounts
    .filter(s => s.count > 0)
    .map(s => ({
      ...s,
      percentage: totalAllOrders ? Math.round((s.count / totalAllOrders) * 100) : 0
    }))

  res.status(200).json({
    success: true,
    data: {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      uniqueCustomers,
      chart,
      topProducts,
      ordersByStatus,
    }
  })
});

// GET /admin/admins — list all admins (superadmin only)
export const getAllAdmins = asyncHandler(async (req, res) => {
  if (req.admin.role !== 'superadmin') {
    throw new AppError('Only superadmin can view admin accounts', 403)
  }

  const admins = await Admin.find({}, '-password').sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    data: admins,
  })
})

// DELETE /admin/admins/:id — remove an admin (superadmin only)
export const deleteAdmin = asyncHandler(async (req, res) => {
  if (req.admin.role !== 'superadmin') {
    throw new AppError('Only superadmin can remove admin accounts', 403)
  }

  const { id } = req.params

  // Prevent self-deletion
  if (id === req.admin.id) {
    throw new AppError('You cannot delete your own account', 400)
  }

  const admin = await Admin.findById(id)
  if (!admin) throw new AppError('Admin not found', 404)

  // Prevent deleting another superadmin
  if (admin.role === 'superadmin') {
    throw new AppError('Cannot delete a superadmin account', 403)
  }

  await Admin.findByIdAndDelete(id)

  res.status(200).json({
    success: true,
    message: 'Admin account removed',
  })
})

// PATCH /admin/admins/:id/toggle — activate/deactivate admin
export const toggleAdminStatus = asyncHandler(async (req, res) => {
  if (req.admin.role !== 'superadmin') {
    throw new AppError('Only superadmin can modify admin accounts', 403)
  }

  const admin = await Admin.findById(req.params.id)
  if (!admin) throw new AppError('Admin not found', 404)
  if (admin.role === 'superadmin') throw new AppError('Cannot modify superadmin', 403)

  admin.active = !admin.active
  await admin.save()

  res.status(200).json({
    success: true,
    message: `Admin ${admin.active ? 'activated' : 'deactivated'}`,
    data: { _id: admin._id, active: admin.active },
  })
})