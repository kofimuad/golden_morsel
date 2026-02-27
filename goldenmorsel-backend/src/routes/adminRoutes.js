import express from 'express';
import {
  getDashboardStats,
  getAllOrders,
  confirmPayment,
  getAnalytics,
  getAllAdmins,
  deleteAdmin,
  toggleAdminStatus
} from '../controllers/adminController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All admin routes require authentication
router.use(adminAuthMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrders);
router.post('/orders/:orderId/confirm-payment', confirmPayment);
router.get('/analytics', getAnalytics);
router.get('/admins',              getAllAdmins)
router.delete('/admins/:id',       deleteAdmin)
router.patch('/admins/:id/toggle', toggleAdminStatus)

export default router;