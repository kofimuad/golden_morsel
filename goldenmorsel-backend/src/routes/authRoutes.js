import express from 'express';
import {
  adminLogin,
  adminSignup,
  getCurrentAdmin,
  userSignup,
  userLogin,
  getCurrentUser
} from '../controllers/authController.js';
import {
  validateAdminLogin,
  validateUserSignup,     
  validateUserLogin 
} from '../middleware/validation.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ========== ADMIN ROUTES ==========

// Admin Signup
router.post('/admin-signup', adminSignup);

// Admin Login - WITH VALIDATION
router.post('/admin-login', validateAdminLogin, adminLogin);

// Get current admin - PROTECTED
router.get('/admin-me', adminAuthMiddleware, getCurrentAdmin);

// ========== USER ROUTES ==========

// User Signup - WITH VALIDATION
router.post('/user-signup', validateUserSignup, userSignup);

// User Login - WITH VALIDATION
router.post('/user-login', validateUserLogin, userLogin);

// Get current user - PROTECTED
router.get('/user-me', authMiddleware, getCurrentUser);

export default router;