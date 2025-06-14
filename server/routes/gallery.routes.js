//gallery.routes.js
import express from 'express';
import {
  uploadEventImages
} from '../controllers/gallery.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Upload images to event gallery
router.post('/events/:eventId/images', authMiddleware, uploadEventImages);

// Additional routes can be added here as needed for gallery functionality
// such as getting images, deleting images, etc.

export default router;