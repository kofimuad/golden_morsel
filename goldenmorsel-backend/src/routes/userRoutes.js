import express from 'express';
import {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  getUserOrders
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.post('/signup', signup);
router.post('/login', login);

// Protected
router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, updateProfile);
router.get('/orders', authMiddleware, getUserOrders);

export default router;