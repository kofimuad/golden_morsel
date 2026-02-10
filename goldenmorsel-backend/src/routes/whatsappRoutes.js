import express from 'express';
import {
  verifyWhatsAppWebhook,    // NEW: Separate verification function
  whatsappWebhook,
  sendOrderMessage
} from '../controllers/whatsappController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// ========== META WEBHOOK VERIFICATION ==========
// GET request - Meta verifies our webhook endpoint
// No authentication needed for this endpoint
router.get('/webhook', verifyWhatsAppWebhook);

// ========== INCOMING MESSAGE PROCESSING ==========
// POST request - Meta sends incoming messages here
// No authentication needed (Meta sends from their servers)
router.post('/webhook', whatsappWebhook);

// ========== SEND MESSAGE TO CUSTOMER ==========
// Admin sends message to customer
// Requires admin authentication
router.post('/:orderId/send', adminAuthMiddleware, sendOrderMessage);

export default router;