//guest.routes.js
import express from 'express';
import {
  addGuest
} from '../controllers/guest.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Add a guest to an event
router.post('/events/:eventId/guests', authMiddleware, addGuest);

// Additional routes can be added here as needed for guest functionality
// such as getting guests, updating guests, deleting guests, etc.

export default router;