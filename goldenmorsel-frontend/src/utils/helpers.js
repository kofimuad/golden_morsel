// Format currency
export const formatCurrency = (amount, currency = 'GHS') => {
  const symbol = currency === 'GHS' ? 'GH₵' : currency;
  return `${symbol} ${parseFloat(amount).toFixed(2)}`;
};

// Format date
export const formatDate = (date, format = 'long') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Truncate text
export const truncate = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (Ghana)
export const isValidPhone = (phone) => {
  const re = /^(\+233|0)[2-9]\d{8}$/;
  return re.test(phone.replace(/\s/g, ''));
};

// Get image URL or placeholder
export const getImageUrl = (image, placeholder = '/placeholder.jpg') => {
  return image || placeholder;
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// Sleep/delay utility
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default {
  formatCurrency,
  formatDate,
  truncate,
  generateId,
  debounce,
  throttle,
  isValidEmail,
  isValidPhone,
  getImageUrl,
  calculateDiscount,
  groupBy,
  sleep,
  isEmpty,
  deepClone,
  formatFileSize,
};