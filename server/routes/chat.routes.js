//chat.routes.js
import express from 'express';
import {
  sendMessage,
  getUserMessages,
  getEventMessages,
  deleteMessage
} from '../controllers/chat.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Send a message
router.post('/', authMiddleware, sendMessage);

// Get user messages
router.get('/users/:otherUserId', authMiddleware, getUserMessages);

// Get event messages
router.get('/events/:eventId', authMiddleware, getEventMessages);

// Delete a message
router.delete('/:messageId', authMiddleware, deleteMessage);

export default router;