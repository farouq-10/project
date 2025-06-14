//support.routes.js
import express from "express";
import {
  submitTicket,
  getUserTickets,
  getTicketById,
  updateTicketStatus,
  addTicketReply,
  getTicketReplies
} from "../controllers/support.controller.js";

import { authMiddleware } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { submitTicketSchema, updateTicketStatusSchema, addTicketReplySchema } from '../validators/support.validators.js';

const router = express.Router();

// Public route - anyone can submit a ticket
router.post("/tickets", validate(submitTicketSchema), submitTicket);

// Protected routes - require authentication
router.get("/tickets", authMiddleware, getUserTickets);
router.get("/tickets/:ticketId", authMiddleware, getTicketById);
router.patch("/tickets/:ticketId/status", authMiddleware, validate(updateTicketStatusSchema), updateTicketStatus);
router.post("/tickets/:ticketId/replies", authMiddleware, validate(addTicketReplySchema), addTicketReply);
router.get("/tickets/:ticketId/replies", authMiddleware, getTicketReplies);

export default router;