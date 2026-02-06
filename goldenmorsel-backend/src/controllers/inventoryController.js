import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// GET stock levels
export const getStockLevels = asyncHandler(async (req, res) => {
  const products = await Product.find({ active: true })
    .select('title stock lowStockThreshold isLowStock')
    .sort({ stock: 1 });

  const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);

  res.status(200).json({
    success: true,
    data: {
      allProducts: products,
      lowStockAlert: lowStockItems,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    }
  });
});

// GET inventory logs
export const getInventoryLogs = asyncHandler(async (req, res) => {
  const { limit = 20, page = 1, reason, productId } = req.query;

  let filter = {};
  if (reason) filter.reason = reason;
  if (productId) filter.productId = productId;

  const skip = (page - 1) * limit;

  const logs = await InventoryLog.find(filter)
    .populate('productId', 'title')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await InventoryLog.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: logs.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: logs
  });
});

// GET low stock alerts
export const getLowStockAlerts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    $expr: { $lte: ['$stock', '$lowStockThreshold'] },
    active: true
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// RESTOCK product
export const restockProduct = asyncHandler(async (req, res) => {
  const { productId, quantity, reference, supplier, notes } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    throw new AppError('Valid productId and quantity required', 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Create inventory log
  await InventoryLog.create({
    productId,
    productTitle: product.title,
    quantityBefore: product.stock,
    quantityAfter: product.stock + quantity,
    change: quantity,
    reason: 'restock',
    reference,
    changedBy: req.adminId,
    notes: notes || `Restock from ${supplier}`
  });

  // Update stock
  product.stock += quantity;
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product restocked successfully',
    data: product
  });
});

// MANUAL adjustment
export const adjustInventory = asyncHandler(async (req, res) => {
  const { productId, newQuantity, reason, notes } = req.body;

  if (!productId || newQuantity === undefined) {
    throw new AppError('productId and newQuantity required', 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const oldQuantity = product.stock;
  const change = newQuantity - oldQuantity;

  // Create log
  await InventoryLog.create({
    productId,
    productTitle: product.title,
    quantityBefore: oldQuantity,
    quantityAfter: newQuantity,
    change,
    reason: reason || 'manual_adjustment',
    changedBy: req.adminId,
    notes
  });

  // Update
  product.stock = newQuantity;
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Inventory adjusted',
    data: product
  });
});