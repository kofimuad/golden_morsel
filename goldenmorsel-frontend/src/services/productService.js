import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const productService = {
  // Get all products
  getAllProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`${ENDPOINTS.PRODUCTS}?${params}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(ENDPOINTS.PRODUCT_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await api.get(ENDPOINTS.FEATURED_PRODUCTS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm) => {
    try {
      const response = await api.get(`${ENDPOINTS.PRODUCTS}?search=${searchTerm}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;