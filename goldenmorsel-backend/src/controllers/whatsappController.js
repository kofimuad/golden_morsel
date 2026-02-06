import Order from '../models/Order.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendWhatsAppMessage, generateOrderMessage } from '../services/whatsappService.js';

// WEBHOOK - receive WhatsApp messages
export const whatsappWebhook = asyncHandler(async (req, res) => {
  const { entry } = req.body;

  // Verify token
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  // Process incoming messages
  if (entry && entry[0].changes) {
    const change = entry[0].changes[0];
    const value = change.value;

    if (value.messages && value.messages[0]) {
      const message = value.messages[0];
      const senderPhone = value.contacts[0].wa_id;
      const messageText = message.text.body;

      console.log(`📨 WhatsApp message from ${senderPhone}: ${messageText}`);

      // Find related order
      const order = await Order.findOne({
        'guestInfo.phone': `+${senderPhone}`
      }).sort({ createdAt: -1 });

      if (order) {
        // Check for payment keywords
        const paymentKeywords = ['paid', 'sent', 'transfer', 'confirmed', 'done', 'payment'];
        const isPaymentMessage = paymentKeywords.some(kw =>
          messageText.toLowerCase().includes(kw)
        );

        if (isPaymentMessage) {
          // Auto-confirm payment
          order.paymentStatus = 'paid';
          order.status = 'confirmed';
          order.confirmedAt = new Date();
          order.internalNotes = `WhatsApp message: ${messageText}`;
          await order.save();

          console.log(`✅ Payment confirmed for order ${order.orderId}`);

          // Send confirmation
          await sendWhatsAppMessage(
            senderPhone,
            `✅ Payment received! Order #${order.orderId} confirmed. We'll prepare your order shortly.`
          );
        }
      }
    }
  }

  res.status(200).json({ success: true });
});

// SEND order message to customer
export const sendOrderMessage = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  const message = generateOrderMessage(order);
  await sendWhatsAppMessage(order.guestInfo.phone, message);

  res.status(200).json({
    success: true,
    message: 'Message sent to customer'
  });
});