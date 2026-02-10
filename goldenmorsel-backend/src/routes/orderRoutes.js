import express from 'express';
import {
  createOrder,
  getOrderById,
  trackOrderByPhone,
  updateOrderStatus
} from '../controllers/orderController.js';
import { validateCreateOrder } from '../middleware/validation.js';  // ADDED
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ========== GUEST ROUTES (No authentication required) ==========

// Create order - WITH VALIDATION
// Validates: name, phone, email, address, items, prices
router.post('/create', validateCreateOrder, createOrder);

// Get order by ID
router.get('/:orderId', getOrderById);

// Track orders by phone
router.get('/track/:phone', trackOrderByPhone);

// ========== ADMIN ROUTES (Authentication required) ==========

// Update order status
router.put('/:orderId/status', adminAuthMiddleware, updateOrderStatus);

export default router;