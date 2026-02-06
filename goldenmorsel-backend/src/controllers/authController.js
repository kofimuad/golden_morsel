import Admin from '../models/Admin.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

// ADMIN LOGIN
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password required', 400);
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.matchPassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!admin.active) {
    throw new AppError('Admin account is inactive', 403);
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_ADMIN_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      admin: admin.toJSON(),
      token
    }
  });
});

// GET current admin
export const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.adminId);

  res.status(200).json({
    success: true,
    data: admin
  });
});