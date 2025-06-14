//chatController.js
import * as chatService from '../services/chat.service.js';
import { logUserActivity } from '../utils/activityLogger.js';

/**
 * Send a message
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content, eventId } = req.body;
    
    // Validate required fields
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    if (!receiverId && !eventId) {
      return res.status(400).json({
        success: false,
        message: 'Either receiverId or eventId is required'
      });
    }

    // Save message
    const message = await chatService.saveMessage({
      senderId,
      receiverId,
      content,
      eventId
    });

    // Log activity
    await logUserActivity(senderId, 'message_sent', {
      messageId: message.id,
      receiverId,
      eventId
    });

    return res.status(201).json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error(`[Chat Controller] Send Message Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Get user messages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    // Get messages
    const messages = await chatService.getUserMessages(userId, otherUserId);

    return res.status(200).json({
      success: true,
      data: messages
    });

  } catch (error) {
    console.error(`[Chat Controller] Get User Messages Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to get messages',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Get event messages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getEventMessages = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Get messages
    const messages = await chatService.getEventMessages(eventId);

    return res.status(200).json({
      success: true,
      data: messages
    });

  } catch (error) {
    console.error(`[Chat Controller] Get Event Messages Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to get event messages',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Delete a message
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { messageId } = req.params;
    
    // Delete message
    await chatService.deleteMessage(messageId, userId);

    // Log activity
    await logUserActivity(userId, 'message_deleted', {
      messageId
    });

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error(`[Chat Controller] Delete Message Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};