import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

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
      select: false // Don't return in queries by default
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

// ========== PASSWORD HASHING MIDDLEWARE ==========
// Hash password before saving if it's new or modified
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return next();

  try {
    // Generate salt and hash password
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ========== PASSWORD COMPARISON METHOD ==========
// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// ========== JSON SERIALIZATION ==========
// Don't include password in JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;