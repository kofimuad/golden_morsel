import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// GET all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, limit = 10, page = 1 } = req.query;

  let filter = { active: true };

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .limit(parseInt(limit))
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: products
  });
});

// GET single product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// CREATE product (Admin)
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, priceDisplay, category, image, stock, variants } = req.body;

  if (!title || !description || !price || !image) {
    throw new AppError('Please provide all required fields', 400);
  }

  const product = await Product.create({
    title,
    description,
    price,
    priceDisplay: priceDisplay || `GH₵ ${price.toFixed(2)}`,
    category,
    image,
    stock: stock || 0,
    variants: variants || [],
    createdBy: req.adminId
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product
  });
});

// UPDATE product (Admin)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product
  });
});

// DELETE product (Admin)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// GET products by category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const products = await Product.find({
    category,
    active: true
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});