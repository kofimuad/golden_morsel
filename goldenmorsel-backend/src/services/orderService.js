/**
 * Calculate order totals
 */
export const calculateOrderTotals = (items, vatPercentage = 6, shippingCost = 0, freeShippingAbove = 200) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vat = subtotal * (vatPercentage / 100);
  const shipping = subtotal >= freeShippingAbove ? 0 : shippingCost;
  const total = subtotal + vat + shipping;

  return {
    subtotal,
    vat,
    vatPercentage,
    shipping,
    total
  };
};

/**
 * Format order for response
 */
export const formatOrderResponse = (order) => {
  return {
    orderId: order.orderId,
    status: order.status,
    paymentStatus: order.paymentStatus,
    total: order.total,
    createdAt: order.createdAt,
    items: order.items,
    customer: {
      name: order.guestInfo.name,
      phone: order.guestInfo.phone,
      email: order.guestInfo.email
    }
  };
};