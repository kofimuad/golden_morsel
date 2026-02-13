import Order from '../models/Order.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendWhatsAppMessage, generateOrderMessage, generateCheckoutMessage } from '../services/whatsappService.js';

// ========== WEBHOOK VERIFICATION (GET REQUEST) ==========
// Meta webhook verification - SEPARATE FROM MESSAGE PROCESSING
export const verifyWhatsAppWebhook = (req, res) => {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check for required parameters
  if (!token || !challenge) {
    console.error('❌ Missing webhook verification parameters');
    return res.status(400).json({
      error: 'Missing verification parameters'
    });
  }

  // Verify token matches environment variable
  if (token !== process.env.WHATSAPP_VERIFY_TOKEN) {
    console.error('❌ Invalid WhatsApp verification token');
    return res.status(403).json({
      error: 'Invalid verification token'
    });
  }

  // Success - return challenge to Meta
  console.log('✓ WhatsApp webhook verified successfully');
  res.status(200).send(challenge);
};

// ========== MESSAGE WEBHOOK (POST REQUEST) ==========
// Receive and process WhatsApp messages
export const whatsappWebhook = asyncHandler(async (req, res) => {
  // Immediately acknowledge to Meta (they need response within 20 seconds)
  res.status(200).json({ success: true });

  // Process message asynchronously in background
  setImmediate(async () => {
    try {
      const { entry } = req.body;

      // Check if we have message data
      if (!entry || !entry[0] || !entry[0].changes) {
        return;
      }

      const change = entry[0].changes[0];
      const value = change.value;

      // Check if this is an incoming message
      if (!value.messages || !value.messages[0]) {
        return;
      }

      const message = value.messages[0];
      const senderPhone = value.contacts[0].wa_id;
      const messageText = message.text.body;

      console.log(`📨 WhatsApp message from ${senderPhone}: ${messageText}`);

      // Find related order by phone number
      const order = await Order.findOne({
        'guestInfo.phone': `+${senderPhone}`
      }).sort({ createdAt: -1 }); // Get most recent order

      if (order && order.paymentStatus !== 'paid') {
        // Check for payment keywords in message
        const paymentKeywords = ['paid', 'sent', 'transfer', 'confirmed', 'done', 'payment'];
        const isPaymentMessage = paymentKeywords.some(kw =>
          messageText.toLowerCase().includes(kw)
        );

        if (isPaymentMessage) {
          // Mark order as confirmed but not yet paid
          // Admin must verify the payment in dashboard
          order.status = 'confirmed';
          order.confirmedAt = new Date();
          // Store the message (truncate to 200 chars for safety)
          order.internalNotes = `WhatsApp message: ${messageText.substring(0, 200)}`;
          await order.save();

          console.log(`✅ Order ${order.orderId} marked as confirmed`);

          // Send acknowledgment to customer
          await sendWhatsAppMessage(
            senderPhone,
            `Thanks for letting us know! Our team will verify your payment shortly and confirm your order.`
          );
        }
      }
    } catch (error) {
      console.error('❌ Webhook processing error:', error.message);
      // Don't throw - we already responded to Meta
      // Silent failure is better than blocking Meta's webhook
    }
  });
});

// ========== SEND ORDER MESSAGE TO CUSTOMER ==========
// Admin sends order details to customer via WhatsApp
export const sendOrderMessage = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // Find order
  const order = await Order.findOne({ orderId });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Generate message
  const message = generateOrderMessage(order);
  
  // Send to customer
  await sendWhatsAppMessage(order.guestInfo.phone, message);

  res.status(200).json({
    success: true,
    message: 'Message sent to customer successfully'
  });
});

// ========== SEND CHECKOUT MESSAGE TO CUSTOMER ==========
// Frontend sends checkout order data to WhatsApp
export const sendCheckout = asyncHandler(async (req, res) => {
  const { customer, items, subtotal, deliveryFee, total } = req.body;

  // Validate required fields
  if (!customer || !customer.phone || !items || items.length === 0) {
    throw new AppError('Missing required checkout data', 400);
  }

  try {
    // Generate checkout message
    const message = generateCheckoutMessage({
      customer,
      items,
      subtotal,
      deliveryFee,
      total
    });

    // Clean and format phone number - ensure it has country code
    let phone = customer.phone.toString().trim();
    // Remove common formatting characters
    phone = phone.replace(/[\s\-\(\)]/g, '');
    // If phone doesn't start with +, add +233 (Ghana code)
    if (!phone.startsWith('+')) {
      // Remove leading 0 if present
      if (phone.startsWith('0')) {
        phone = phone.substring(1);
      }
      phone = '+233' + phone;
    }

    console.log(`📱 Sending WhatsApp checkout to: ${phone}`);
    
    // Send to customer
    await sendWhatsAppMessage(phone, message);

    res.status(200).json({
      success: true,
      message: 'Checkout details sent to customer successfully',
      phone: phone
    });
  } catch (error) {
    console.error('❌ Checkout error:', error.message);
    throw new AppError(`Failed to send checkout message: ${error.message}`, 500);
  }
});