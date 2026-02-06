export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded'
};

export const PAYMENT_METHODS = {
  WHATSAPP: 'whatsapp',
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_MONEY: 'mobile_money'
};

export const INVENTORY_REASONS = {
  ORDER_PAID: 'order_paid',
  RESTOCK: 'restock',
  MANUAL_ADJUSTMENT: 'manual_adjustment',
  DAMAGE: 'damage',
  RETURN: 'return'
};

export const PRODUCT_CATEGORIES = {
  TREATIES: 'treaties',
  MEMORIA: 'memoria',
  CONVENTION: 'convention'
};

export const ADMIN_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff'
};

export const PERMISSIONS = {
  VIEW_ORDERS: 'view_orders',
  CONFIRM_PAYMENT: 'confirm_payment',
  MANAGE_INVENTORY: 'manage_inventory',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ADMINS: 'manage_admins',
  VIEW_ANALYTICS: 'view_analytics'
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Validation
export const VALIDATION = {
  PHONE_REGEX: /^\+?[0-9]{10,15}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6
};