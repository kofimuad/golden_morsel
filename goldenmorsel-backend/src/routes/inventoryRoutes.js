import express from 'express';
import {
  getStockLevels,
  getInventoryLogs,
  getLowStockAlerts,
  restockProduct,
  adjustInventory
} from '../controllers/inventoryController.js';
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Protected routes (admin only)
router.use(adminAuthMiddleware);

router.get('/stock', getStockLevels);
router.get('/logs', getInventoryLogs);
router.get('/alerts', getLowStockAlerts);
router.post('/restock', restockProduct);
router.post('/adjust', adjustInventory);

export default router;