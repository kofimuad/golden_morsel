import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goldenmorsel';
    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB connected');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected');
  } catch (error) {
    console.error('❌ Disconnect error:', error);
    throw error;
  }
};