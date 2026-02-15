import express from 'express';
import {
  adminLogin,
  adminSignup,
  getCurrentAdmin
} from '../controllers/authController.js';
import {
  signup as userSignup,
  login as userLogin,
  getCurrentUser
} from '../controllers/userController.js';
import {
  validateAdminLogin,
  validateUserSignup,     
  validateUserLogin 
} from '../middleware/validation.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ========== ADMIN ROUTES ==========
router.post('/admin-signup', adminSignup);
router.post('/admin-login', validateAdminLogin, adminLogin);
router.get('/admin-me', adminAuthMiddleware, getCurrentAdmin);

// ========== USER ROUTES ==========
router.post('/signup', validateUserSignup, userSignup);
router.post('/login', validateUserLogin, userLogin);
router.get('/me', authMiddleware, getCurrentUser);

export default router;