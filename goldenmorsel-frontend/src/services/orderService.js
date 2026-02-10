import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post(ENDPOINTS.ORDERS, orderData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(ENDPOINTS.ORDER_BY_ID(orderId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Track order
  trackOrder: async (trackingNumber) => {
    try {
      const response = await api.get(ENDPOINTS.ORDER_TRACKING(trackingNumber));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await api.get(ENDPOINTS.ORDERS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update order status (admin)
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(ENDPOINTS.ORDER_BY_ID(orderId), { status });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;