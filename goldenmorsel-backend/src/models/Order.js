import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      sparse: true
    },
    
    // Customer information
    guestInfo: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: String,
      address: String,
      city: String,
      region: String,
      _id: false
    },
    
    // Optional: if customer has account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    // Order items
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        title: {
          type: String,
          required: true
        },
        variant: String,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: {
          type: Number,
          required: true
        },
        subtotal: {
          type: Number,
          required: true
        },
        _id: false
      }
    ],
    
    // Totals
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    vat: {
      type: Number,
      default: 0,
      min: 0
    },
    vatPercentage: {
      type: Number,
      default: 6
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    
    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid'
    },
    
    // Payment
    paymentMethod: {
      type: String,
      enum: ['whatsapp', 'bank_transfer', 'mobile_money'],
      default: 'whatsapp'
    },
    paymentReference: String,
    paymentProof: String,
    
    // Timestamps
    confirmedAt: Date,
    paidAt: Date,
    processedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    
    // Notes
    notes: String,
    internalNotes: String
  },
  { timestamps: true }
);

// Auto-generate orderId
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    this.orderId = `ORD-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Indexes
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'guestInfo.phone': 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;