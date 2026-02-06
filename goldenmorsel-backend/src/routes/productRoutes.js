import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} from '../controllers/productController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Admin routes
router.post('/', adminAuthMiddleware, createProduct);
router.put('/:id', adminAuthMiddleware, updateProduct);
router.delete('/:id', adminAuthMiddleware, deleteProduct);

export default router;