import express from 'express';
import {
  adminLogin,
  adminSignup,
  getCurrentAdmin,
  userSignup,
  userLogin,
  getCurrentUser
} from '../controllers/authController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// ========== ADMIN ROUTES ==========
router.post('/admin-signup', adminSignup);
router.post('/admin-login', adminLogin);
router.get('/admin-me', adminAuthMiddleware, getCurrentAdmin);

// ========== USER ROUTES ==========
router.post('/user-signup', userSignup);
router.post('/user-login', userLogin);
router.get('/user-me', authMiddleware, getCurrentUser);

export default router;