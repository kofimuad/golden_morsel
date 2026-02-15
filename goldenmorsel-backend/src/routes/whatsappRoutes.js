import express from 'express';
import {
  verifyWhatsAppWebhook,
  whatsappWebhook,
  sendOrderMessage,
  sendCheckout
} from '../controllers/whatsappController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ========== META WEBHOOK VERIFICATION & PROCESSING ==========
// GET - Meta verifies webhook on setup
router.get('/webhook', verifyWhatsAppWebhook);

// POST - Meta sends incoming messages here
router.post('/webhook', whatsappWebhook);

// ========== SEND CHECKOUT MESSAGE ==========
// Frontend sends checkout order data
router.post('/send-checkout', sendCheckout);

// ========== SEND ORDER MESSAGE ==========
// Admin sends message to customer about their order
router.post('/orders/:orderId/send', adminAuthMiddleware, sendOrderMessage);

export default router;