export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  FEATURED_PRODUCTS: '/products/featured',
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_TRACKING: (trackingNumber) => `/orders/track/${trackingNumber}`,
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_VERIFY: '/auth/verify',
  
  // WhatsApp
  WHATSAPP_CHECKOUT: '/whatsapp/checkout',
  WHATSAPP_TRACKING: '/whatsapp/tracking',
  
  // Inventory
  INVENTORY: '/inventory',
  CHECK_AVAILABILITY: '/inventory/check',
};

export const WHATSAPP_CONFIG = {
  BUSINESS_NUMBER: process.env.REACT_APP_WHATSAPP_NUMBER || '+233123456789',
  MESSAGE_TEMPLATES: {
    ORDER: (orderData) => 
      `Hello! I'd like to place an order:\n\n${orderData.items.map(item => 
        `• ${item.name} (${item.quantity}x) - GH₵${item.price}`
      ).join('\n')}\n\nTotal: GH₵${orderData.total}`,
  },
};

export default API_CONFIG;