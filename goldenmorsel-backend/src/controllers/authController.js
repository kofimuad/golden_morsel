import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// ========== ADMIN CONTROLLERS ==========

// Admin Signup
export const adminSignup = async (req, res) => {
  try {
    // ── Must be authenticated superadmin ─────────────────────
    if (!req.admin || req.admin.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Only a superadmin can create new admin accounts',
      })
    }

    const { email, password, name, phone, role = 'admin' } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      })
    }

    // Prevent creating another superadmin unless you want to allow it
    if (role === 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot create another superadmin account',
      })
    }

    const existing = await Admin.findOne({ email })
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists',
      })
    }

    const salt     = await bcryptjs.genSalt(10)
    const hashed   = await bcryptjs.hash(password, salt)

    const admin = await Admin.create({
      email,
      password: hashed,
      name,
      phone,
      role:        'admin',
      permissions: [
        'view_orders',
        'confirm_payment',
        'manage_inventory',
        'manage_products',
        'view_analytics',
        // Note: manage_admins NOT given to regular admins
      ],
      active: true,
    })

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      data: {
        _id:   admin._id,
        email: admin.email,
        name:  admin.name,
        role:  admin.role,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_ADMIN_SECRET || 'admin_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          _id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Current Admin
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ========== USER CONTROLLERS ==========

// User Signup
export const userSignup = async (req, res) => {
  try {
    const { phone, email, password, name } = req.body;

    // Validate input
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // Validate password length
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone already exists'
      });
    }

    // Create user
    // Password will be hashed by pre-save hook in User model
    const user = await User.create({
      phone,
      email,
      password: password || null, // Allow signup without password initially
      name,
      addresses: [],
      preferences: {
        emailNotifications: true,
        smsNotifications: true
      }
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'user_secret_key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: user.toJSON(), // Password automatically excluded
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// User Login - FIXED WITH PASSWORD VALIDATION
export const userLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate input
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ phone }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone or password'
      });
    }

    // Check if user has password set
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Please set a password first'
      });
    }

    // ========== CRITICAL FIX: VALIDATE PASSWORD ==========
    // This ALWAYS validates the password against the hash
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone or password'
      });
    }
    // ========== END PASSWORD VALIDATION ==========

    // Generate token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'user_secret_key',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(), // Password automatically excluded by toJSON()
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};