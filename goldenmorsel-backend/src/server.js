import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();

// VALIDATE ENVIRONMENT VARIABLES FIRST
import { validateEnvironment } from './config/envValidator.js';
validateEnvironment();

// Import routes
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';

// ========== RATE LIMITING CONFIGURATION ==========

// General rate limiter for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health',
});

// Strict rate limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 100 : 5,
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Rate limiter for order creation
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isDev ? 500 : 20,
  message: 'Too many orders, please try again later.',
});

// ========== MIDDLEWARE ==========

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { allowCrossOrigin: true },
}));

app.use(morgan('combined'));

app.use(cors({
  origin: (origin, callback) => {
    const allowed = (process.env.FRONTEND_URL || 'http://localhost:3000,https://golden-morsel.netlify.app').split(',')
    if (!origin || allowed.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200,
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(generalLimiter);

// ========== DATABASE CONNECTION ==========

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goldenmorsel';
    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ========== ROUTES ==========

app.use('/api/products',   productRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/whatsapp',   whatsappRoutes);
app.use('/api/auth',       authLimiter,  authRoutes);
app.use('/api/orders',     orderLimiter, orderRoutes);
app.use('/api/inventory',  inventoryRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api/upload',     uploadRoutes);

// ========== HEALTH CHECK ==========

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'GoldenMorsel API is running',
    environment: process.env.NODE_ENV || 'development',
  });
});

// ========== 404 HANDLER ==========

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// ========== ERROR HANDLER ==========

app.use(errorHandler);

// ========== START SERVER ==========

const startServer = async () => {
  app.listen(PORT, () => {
    console.log('\n🚀 GoldenMorsel Backend Server');
    console.log('================================');
    console.log(`🔗 Server running on http://localhost:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🛡️  Rate limiting: ${isDev ? 'relaxed (dev)' : 'strict (production)'}`);
    console.log('================================\n');
  });
};

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app;