import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    name: {
      type: String,
      required: true
    },
    phone: String,
    role: {
      type: String,
      enum: ['admin', 'manager', 'staff'],
      default: 'admin'
    },
    permissions: [String],
    active: {
      type: Boolean,
      default: true
    },
    lastLogin: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Don't include password in JSON by default
adminSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;