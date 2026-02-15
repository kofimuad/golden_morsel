import api from './api';
import { ENDPOINTS } from '../config/api.config';

const whatsappService = {
  // Send checkout via WhatsApp
  sendCheckout: async (orderData) => {
    try {
      console.log('📤 Sending checkout:', orderData);
      const response = await api.post(ENDPOINTS.WHATSAPP_CHECKOUT, orderData);
      console.log('✅ Checkout sent:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Checkout error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Open WhatsApp with pre-filled message
  openWhatsAppCheckout: (phone, message) => {
    try {
      // Clean phone number
      let cleanPhone = phone.toString().trim();
      cleanPhone = cleanPhone.replace(/[^\d+]/g, '');
      
      // Remove leading + if present
      if (cleanPhone.startsWith('+')) {
        cleanPhone = cleanPhone.substring(1);
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
      
      console.log('📱 Opening WhatsApp:', whatsappUrl);
      window.open(whatsappUrl, '_blank', 'width=500,height=600');
    } catch (error) {
      console.error('❌ WhatsApp URL error:', error.message);
      throw error;
    }
  }
};

export default whatsappService;