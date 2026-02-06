import express from 'express';
import {
  adminLogin,
  getCurrentAdmin
} from '../controllers/authController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/admin-login', adminLogin);
router.get('/admin-me', adminAuthMiddleware, getCurrentAdmin);

export default router;