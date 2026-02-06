import User from '../models/User.js';
import Order from '../models/Order.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

// SIGNUP
export const signup = asyncHandler(async (req, res) => {
  const { phone, email, password, name } = req.body;

  if (!phone) {
    throw new AppError('Phone number required', 400);
  }

  const userExists = await User.findOne({ phone });
  if (userExists) {
    throw new AppError('Phone number already registered', 400);
  }

  const user = await User.create({
    phone,
    email,
    password,
    name
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      user: user.toJSON(),
      token
    }
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new AppError('Phone and password required', 400);
  }

  const user = await User.findOne({ phone }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.toJSON(),
      token
    }
  });
});

// GET current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  res.status(200).json({
    success: true,
    data: user
  });
});

// UPDATE profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, addresses, emailNotifications, smsNotifications } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      name,
      email,
      addresses,
      emailNotifications,
      smsNotifications
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated',
    data: user
  });
});

// GET user orders
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    $or: [
      { userId: req.userId },
      { 'guestInfo.phone': req.user.phone }
    ]
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});