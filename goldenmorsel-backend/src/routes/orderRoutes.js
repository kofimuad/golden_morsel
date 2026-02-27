import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrderByReference,
  trackOrderByPhone,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { validateCreateOrder } from '../middleware/validation.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ── Specific routes FIRST (before any :param routes) ──────────
router.post('/create', validateCreateOrder, createOrder);
router.get('/ref/:orderId',    getOrderByReference);   // ← must be before /:orderId
router.get('/track/:phone',    trackOrderByPhone);     // ← must be before /:orderId

// ── Generic param routes LAST ──────────────────────────────────
router.get('/:orderId',        getOrderById);
router.put('/:orderId/status', adminAuthMiddleware, updateOrderStatus);

export default router;