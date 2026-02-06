import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send order confirmation email
 */
export const sendOrderEmail = async (order) => {
  try {
    const itemsList = order.items
      .map(item => `<li>${item.title} x${item.quantity} = GH₵ ${(item.price * item.quantity).toFixed(2)}</li>`)
      .join('');

    const html = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer:</strong> ${order.guestInfo.name}</p>
      
      <h3>Items:</h3>
      <ul>${itemsList}</ul>
      
      <p><strong>Total:</strong> GH₵ ${order.total.toFixed(2)}</p>
      
      <p>We've sent payment instructions to your WhatsApp.</p>
      <p>Thank you for shopping with GoldenMorsel!</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.guestInfo.email,
      subject: `Order Confirmation - ${order.orderId}`,
      html
    });

    console.log(`✓ Email sent to ${order.guestInfo.email}`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};

/**
 * Send payment confirmation email
 */
export const sendPaymentConfirmationEmail = async (order) => {
  try {
    const html = `
      <h2>Payment Confirmed</h2>
      <p>Your payment for order <strong>${order.orderId}</strong> has been confirmed.</p>
      
      <p><strong>Total:</strong> GH₵ ${order.total.toFixed(2)}</p>
      
      <p>We're preparing your order now. We'll send you tracking details soon!</p>
      <p>Thank you!</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.guestInfo.email,
      subject: `Payment Confirmed - ${order.orderId}`,
      html
    });

    console.log(`✓ Payment confirmation email sent`);
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
};