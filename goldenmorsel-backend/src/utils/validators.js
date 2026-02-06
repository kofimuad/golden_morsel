import { VALIDATION } from '../config/constants.js';

/**
 * Validate phone number
 */
export const isValidPhone = (phone) => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate order items
 */
export const validateOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: false, error: 'Items array cannot be empty' };
  }

  for (const item of items) {
    if (!item.productId || !item.quantity || !item.price) {
      return { valid: false, error: 'Each item must have productId, quantity, and price' };
    }
    if (item.quantity <= 0) {
      return { valid: false, error: 'Quantity must be greater than 0' };
    }
  }

  return { valid: true };
};