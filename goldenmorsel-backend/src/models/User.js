import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^\+?[0-9]{10,15}$/, 'Valid phone number required']
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Valid email required']
    },
    password: {
      type: String,
      select: false
    },
    name: {
      type: String,
      trim: true
    },
    
    // Addresses
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        region: String,
        default: Boolean,
        _id: false
      }
    ],
    
    // Preferences
    emailNotifications: {
      type: Boolean,
      default: false
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    
    // Tracking
    lastOrderDate: Date,
    totalOrders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove password from JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Indexes
userSchema.index({ phone: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
export default User;