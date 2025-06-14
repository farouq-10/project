//galleryController.js
import * as galleryService from '../services/gallery.service.js';
import { logUserActivity } from '../utils/activityLogger.js';

/**
 * Upload images to an event gallery
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const uploadEventImages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded'
      });
    }

    // Check if user owns the event
    const event = await galleryService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to upload images to this event'
      });
    }

    // Upload images
    const images = await galleryService.uploadEventImages(eventId, req.files);

    // Log activity
    await logUserActivity(userId, 'images_uploaded', {
      eventId,
      imageCount: images.length
    });

    return res.status(201).json({
      success: true,
      data: images
    });

  } catch (error) {
    console.error(`[Gallery Controller] Upload Images Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Get all images for an event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getEventImages = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    // Get event details
    const event = await galleryService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is private and user is not the owner
    if (event.is_private && event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view images for this private event'
      });
    }

    // Get images
    const images = await galleryService.getEventImages(eventId);

    return res.status(200).json({
      success: true,
      data: images
    });

  } catch (error) {
    console.error(`[Gallery Controller] Get Images Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve images',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Delete an image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const userId = req.user.id;
    
    // Check if user owns the image
    const image = await galleryService.getImageById(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Get event to check ownership
    const event = await galleryService.getEventById(image.event_id);
    if (event.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this image'
      });
    }

    // Delete image
    await galleryService.deleteImage(imageId);

    // Log activity
    await logUserActivity(userId, 'image_deleted', {
      eventId: image.event_id,
      imageId
    });

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error(`[Gallery Controller] Delete Image Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};
