import Product from '../models/Product.js';
import InventoryLog from '../models/InventoryLog.js';

/**
 * Reduce inventory when payment is confirmed
 */
export const updateInventoryOnPayment = async (order, adminId = null) => {
  try {
    for (const item of order.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        console.error(`Product ${item.productId} not found`);
        continue;
      }

      // Create inventory log
      await InventoryLog.create({
        orderId: order.orderId,
        productId: item.productId,
        productTitle: product.title,
        quantityBefore: product.stock,
        quantityAfter: Math.max(0, product.stock - item.quantity),
        change: -item.quantity,
        reason: 'order_paid',
        changedBy: adminId,
        reference: order.orderId
      });

      // Update product stock
      product.stock = Math.max(0, product.stock - item.quantity);
      await product.save();

      console.log(`✓ Inventory updated for ${product.title}: ${product.stock} remaining`);
    }

    return true;
  } catch (error) {
    console.error('❌ Inventory update error:', error.message);
    throw error;
  }
};

/**
 * Get inventory summary
 */
export const getInventorySummary = async () => {
  const products = await Product.find({ active: true });

  const summary = {
    totalProducts: products.length,
    totalValue: 0,
    lowStockItems: [],
    outOfStock: []
  };

  for (const product of products) {
    const value = product.price * product.stock;
    summary.totalValue += value;

    if (product.stock === 0) {
      summary.outOfStock.push({ title: product.title, id: product._id });
    } else if (product.stock <= product.lowStockThreshold) {
      summary.lowStockItems.push({
        title: product.title,
        stock: product.stock,
        threshold: product.lowStockThreshold
      });
    }
  }

  return summary;
};