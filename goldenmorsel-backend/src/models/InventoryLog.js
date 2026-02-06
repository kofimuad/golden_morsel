import mongoose from 'mongoose';

const inventoryLogSchema = new mongoose.Schema(
  {
    orderId: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productTitle: String,
    quantityBefore: {
      type: Number,
      required: true
    },
    quantityAfter: {
      type: Number,
      required: true
    },
    change: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      enum: ['order_paid', 'restock', 'manual_adjustment', 'damage', 'return'],
      required: true
    },
    reference: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    notes: String
  },
  { timestamps: true }
);

// Indexes
inventoryLogSchema.index({ productId: 1 });
inventoryLogSchema.index({ orderId: 1 });
inventoryLogSchema.index({ reason: 1 });
inventoryLogSchema.index({ createdAt: -1 });

const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema);
export default InventoryLog;