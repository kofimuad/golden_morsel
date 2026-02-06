/**
 * Format price for display
 */
export const formatPrice = (price) => {
  return `GH₵ ${parseFloat(price).toFixed(2)}`;
};

/**
 * Format date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format order ID
 */
export const generateOrderId = (count) => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  return `ORD-${year}${month}-${String(count + 1).padStart(4, '0')}`;
};

/**
 * Truncate text
 */
export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};