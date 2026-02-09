import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
      select: false
    },
    name: String,
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        default: Boolean
      }
    ],
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: true
      },
      defaultPaymentMethod: String
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    totalOrders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    lastOrderDate: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastLogin: Date
  }
);

// Don't include password in JSON by default
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;