import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    priceDisplay: {
      type: String,
      required: [true, 'Display price is required']
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required']
    },
    category: {
      type: String,
      enum: ['treaties', 'memoria', 'convention'],
      default: 'treaties'
    },
    variants: [
      {
        name: String,
        price: Number,
        _id: false
      }
    ],
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    active: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  { timestamps: true }
);

// Virtual for low stock status
productSchema.virtual('isLowStock').get(function() {
  return this.stock <= this.lowStockThreshold;
});

// Index for text search
productSchema.index({ title: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;