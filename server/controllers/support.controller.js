//support.controller.js
import * as supportService from "../services/support.service.js";
import { logUserActivity } from "../utils/activityLogger.js";
import { submitTicketSchema, updateTicketStatusSchema, addTicketReplySchema, validateData } from "../validators/support.validators.js";

/**
 * Submit a support ticket
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitTicket = async (req, res) => {
  try {
    // Validate input data
    const { isValid, errors } = await validateData(submitTicketSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }

    const { name, email, subject, message, category } = req.body;
    const userId = req.user?.id || null; // Get user ID if authenticated

    const ticketData = {
      userId,
      name,
      email,
      subject,
      message,
      category
    };

    const ticket = await supportService.submitTicket(ticketData);
    
    // Log activity if user is authenticated
    if (userId) {
      await logUserActivity(userId, 'submit_ticket', { ticketId: ticket.id });
    }

    return res.status(201).json({
      success: true,
      message: "Support ticket submitted successfully",
      data: ticket
    });
  } catch (error) {
    console.error("Error submitting support ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit support ticket",
      error: error.message
    });
  }
};

/**
 * Get user tickets
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await supportService.getUserTickets(userId);

    return res.status(200).json({
      success: true,
      message: "User tickets retrieved successfully",
      data: tickets
    });
  } catch (error) {
    console.error("Error retrieving user tickets:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user tickets",
      error: error.message
    });
  }
};

/**
 * Get ticket by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.id;

    const ticket = await supportService.getTicketById(ticketId);

    // Check if ticket belongs to user or user is admin
    if (ticket.user_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to access this ticket"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket retrieved successfully",
      data: ticket
    });
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve ticket",
      error: error.message
    });
  }
};

/**
 * Update ticket status (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateTicketStatus = async (req, res) => {
  try {
    // Validate input data
    const { isValid, errors } = await validateData(updateTicketStatusSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }

    const { ticketId } = req.params;
    const { status } = req.body;

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can update ticket status"
      });
    }

    const updatedTicket = await supportService.updateTicketStatus(ticketId, status);
    
    await logUserActivity(req.user.id, 'update_ticket_status', { 
      ticketId, 
      newStatus: status 
    });

    return res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      data: updatedTicket
    });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update ticket status",
      error: error.message
    });
  }
};

/**
 * Add a reply to a ticket
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addTicketReply = async (req, res) => {
  try {
    // Validate input data
    const { isValid, errors } = await validateData(addTicketReplySchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }

    const { ticketId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin || false;

    // Check if ticket exists and user has access
    const ticket = await supportService.getTicketById(ticketId);
    if (ticket.user_id !== userId && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to reply to this ticket"
      });
    }

    const replyData = {
      ticketId,
      userId,
      isAdmin,
      message
    };

    const reply = await supportService.addTicketReply(replyData);
    
    await logUserActivity(userId, 'add_ticket_reply', { 
      ticketId, 
      replyId: reply.id 
    });

    return res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: reply
    });
  } catch (error) {
    console.error("Error adding reply to ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add reply",
      error: error.message
    });
  }
};

/**
 * Get ticket replies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getTicketReplies = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.id;

    // Check if ticket exists and user has access
    const ticket = await supportService.getTicketById(ticketId);
    if (ticket.user_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view replies for this ticket"
      });
    }

    const replies = await supportService.getTicketReplies(ticketId);

    return res.status(200).json({
      success: true,
      message: "Ticket replies retrieved successfully",
      data: replies
    });
  } catch (error) {
    console.error("Error retrieving ticket replies:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve ticket replies",
      error: error.message
    });
  }
};