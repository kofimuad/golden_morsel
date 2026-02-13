import axios from 'axios';

/**
 * Send WhatsApp message using Meta API
 */
export const sendWhatsAppMessage = async (recipientPhone, message) => {
  try {
    // Clean phone number - remove +, spaces, dashes
    let cleanPhone = recipientPhone.toString().trim();
    cleanPhone = cleanPhone.replace(/[+\s\-\(\)]/g, '');
    
    // Ensure it's a valid format (should be country code + number)
    if (cleanPhone.length < 10) {
      throw new Error(`Invalid phone number format: ${recipientPhone}`);
    }

    const response = await axios.post(
      `https://graph.instagram.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✓ WhatsApp message sent:', response.data.messages[0].id);
    return response.data;
  } catch (error) {
    console.error('❌ WhatsApp error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Generate order message for WhatsApp
 */
export const generateOrderMessage = (order) => {
  let itemsList = order.items
    .map(item => `• ${item.title} x${item.quantity} = GH₵ ${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  return `
Hello! 👋

Order #${order.orderId}

*Items Ordered:*
${itemsList}

*Order Summary:*
Subtotal: GH₵ ${order.subtotal.toFixed(2)}
VAT (${order.vatPercentage}%): GH₵ ${order.vat.toFixed(2)}
Shipping: ${order.shipping === 0 ? 'FREE 🎁' : `GH₵ ${order.shipping.toFixed(2)}`}

*TOTAL: GH₵ ${order.total.toFixed(2)}*

Please reply to confirm your order details.
We'll send payment instructions shortly.

Thank you for shopping with GoldenMorsel! ❤️
  `.trim();
};

/**
 * Send order confirmation to customer
 */
export const sendOrderConfirmation = async (order) => {
  try {
    const message = generateOrderMessage(order);
    await sendWhatsAppMessage(order.guestInfo.phone, message);
    console.log(`✓ Order confirmation sent to ${order.guestInfo.phone}`);
  } catch (error) {
    console.error(`❌ Failed to send confirmation for order ${order.orderId}:`, error.message);
  }
};

/**
 * Send payment confirmation message
 */
export const sendPaymentConfirmation = async (order) => {
  const message = `
✅ Payment Confirmed!

Order #${order.orderId}
Total: GH₵ ${order.total.toFixed(2)}

We're preparing your order now.
We'll send you tracking details soon!

Thank you! 🙏
  `.trim();

  try {
    await sendWhatsAppMessage(order.guestInfo.phone, message);
  } catch (error) {
    console.error(`❌ Failed to send payment confirmation:`, error.message);
  }
};

/**
 * Generate checkout message for WhatsApp
 */
export const generateCheckoutMessage = (checkoutData) => {
  const { customer, items, subtotal, deliveryFee, total } = checkoutData;
  
  let itemsList = items
    .map(item => `• ${item.name} x${item.quantity} = GH₵ ${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  return `
🎉 *Order Summary*

*Customer Details:*
Name: ${customer.fullName}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}, ${customer.city}
${customer.notes ? `Notes: ${customer.notes}` : ''}

*Items Ordered:*
${itemsList}

*Order Total:*
Subtotal: GH₵ ${subtotal.toFixed(2)}
Delivery Fee: GH₵ ${deliveryFee.toFixed(2)}

*TOTAL: GH₵ ${total.toFixed(2)}*

Please confirm this order and proceed with payment instructions.
Thank you for choosing GoldenMorsel! ❤️
  `.trim();
};