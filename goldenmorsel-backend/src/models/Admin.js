import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Valid email required']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: 6
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    phone: String,
    
    role: {
      type: String,
      enum: ['admin', 'manager', 'staff'],
      default: 'staff'
    },
    permissions: [String],
    
    active: {
      type: Boolean,
      default: true
    },
    lastLogin: Date,
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  { timestamps: true }
);

// Hash password
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove password from JSON
adminSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Indexes
adminSchema.index({ email: 1 });
adminSchema.index({ role: 1 });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;