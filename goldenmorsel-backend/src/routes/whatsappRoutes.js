import express from 'express';
import {
  whatsappWebhook,
  sendOrderMessage
} from '../controllers/whatsappController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Webhook (public)
router.post('/webhook', whatsappWebhook);
router.get('/webhook', whatsappWebhook);

// Send message (admin)
router.post('/:orderId/send', adminAuthMiddleware, sendOrderMessage);

export default router;