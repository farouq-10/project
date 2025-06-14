//guestController.js
import * as guestService from '../services/guest.service.js';
import { logUserActivity } from '../utils/activityLogger.js';

/**
 * Add a guest to an event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addGuest = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, email, phone, status } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to add guests to this event'
      });
    }

    // Add guest
    const guest = await guestService.addGuest({
      eventId,
      name,
      email,
      phone,
      status: status || 'pending'
    });

    // Log activity
    await logUserActivity(req.user.id, 'guest_added', {
      eventId,
      guestId: guest.id,
      guestEmail: email
    });

    return res.status(201).json({
      success: true,
      data: guest
    });

  } catch (error) {
    console.error(`[Guest Controller] Add Guest Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to add guest',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Get all guests for an event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getEventGuests = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view guests for this event'
      });
    }

    // Get guests
    const guests = await guestService.getEventGuests(eventId);

    return res.status(200).json({
      success: true,
      data: guests
    });

  } catch (error) {
    console.error(`[Guest Controller] Get Guests Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve guests',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Update a guest
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateGuest = async (req, res) => {
  try {
    const { eventId, guestId } = req.params;
    const updateData = req.body;
    
    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update guests for this event'
      });
    }

    // Update guest
    const guest = await guestService.updateGuest(guestId, updateData);

    return res.status(200).json({
      success: true,
      data: guest
    });

  } catch (error) {
    console.error(`[Guest Controller] Update Guest Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to update guest',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Delete a guest
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteGuest = async (req, res) => {
  try {
    const { eventId, guestId } = req.params;
    
    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete guests for this event'
      });
    }

    // Delete guest
    await guestService.deleteGuest(guestId);

    return res.status(200).json({
      success: true,
      message: 'Guest deleted successfully'
    });

  } catch (error) {
    console.error(`[Guest Controller] Delete Guest Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete guest',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Generate QR codes for guests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateGuestQRCodes = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate QR codes for this event'
      });
    }

    // Generate QR codes
    const qrCodes = await guestService.generateGuestQRCodes(eventId);

    return res.status(200).json({
      success: true,
      data: qrCodes
    });

  } catch (error) {
    console.error(`[Guest Controller] Generate QR Codes Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate QR codes',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Generate event QR code
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateEventQRCode = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Check if user owns the event
    const event = await guestService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to generate QR code for this event'
      });
    }

    // Generate QR code
    const qrCode = await guestService.generateEventQRCode(eventId);

    return res.status(200).json({
      success: true,
      data: qrCode
    });

  } catch (error) {
    console.error(`[Guest Controller] Generate Event QR Code Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate event QR code',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};