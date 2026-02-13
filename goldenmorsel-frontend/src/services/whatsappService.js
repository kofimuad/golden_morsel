import api from './api';
import { ENDPOINTS, WHATSAPP_CONFIG } from '../config/api.config';

const whatsappService = {
  // Send checkout via WhatsApp
  sendCheckout: async (orderData) => {
    try {
      const response = await api.post(ENDPOINTS.WHATSAPP_CHECKOUT, orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send tracking info via WhatsApp
  sendTracking: async (trackingData) => {
    try {
      const response = await api.post(ENDPOINTS.WHATSAPP_TRACKING, trackingData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate WhatsApp URL for direct messaging
  generateWhatsAppURL: (message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.BUSINESS_NUMBER}?text=${encodedMessage}`;
  },

  // Open WhatsApp with order details
  openWhatsAppCheckout: (orderData) => {
    const message = WHATSAPP_CONFIG.MESSAGE_TEMPLATES.ORDER(orderData);
    const url = whatsappService.generateWhatsAppURL(message);
    window.open(url, '_blank');
  },
};

export { whatsappService };
export default whatsappService;