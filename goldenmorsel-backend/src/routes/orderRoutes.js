import express from 'express';
import {
  createOrder,
  getOrderById,
  trackOrderByPhone,
  updateOrderStatus
} from '../controllers/orderController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Guest routes (no auth required)
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);
router.get('/track/:phone', trackOrderByPhone);

// Admin routes
router.put('/:orderId/status', adminAuthMiddleware, updateOrderStatus);

export default router;