//business.routes.js
import express from 'express';
import {
  registerBusiness,
  getBusinessDetails,
  updateBusiness,
  deleteBusiness
} from '../controllers/business.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Register a new business
router.post('/', authMiddleware, registerBusiness);

// Get business details
router.get('/:businessId', getBusinessDetails);

// Update business details
router.put('/:businessId', authMiddleware, updateBusiness);

// Delete a business
router.delete('/:businessId', authMiddleware, deleteBusiness);

export default router;