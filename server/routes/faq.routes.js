// faq.routes.js
import express from 'express';
import * as faqController from '../controllers/faq.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', faqController.getAllFAQs);
router.get('/category/:category', faqController.getFAQsByCategory);
router.get('/search', faqController.searchFAQs);

// Admin routes (protected)
router.post('/', authMiddleware, faqController.createFAQ);
router.put('/:id', authMiddleware, faqController.updateFAQ);
router.delete('/:id', authMiddleware, faqController.deleteFAQ);

// Export router
export default router;