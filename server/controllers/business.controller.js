//businessController.js
import * as businessService from '../services/business.service.js';
import { logUserActivity } from '../utils/activityLogger.js';

/**
 * Register a new business
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const registerBusiness = async (req, res) => {
  try {
    const userId = req.user.id;
    const businessData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'address', 'phone', 'email', 'description'];
    const missingFields = requiredFields.filter(field => !businessData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        fields: missingFields
      });
    }

    // Add user ID to business data
    businessData.userId = userId;

    // Register business
    const business = await businessService.registerBusiness(businessData);

    // Log activity
    await logUserActivity(userId, 'business_registered', {
      businessId: business.id,
      businessName: business.name,
      businessType: business.type
    });

    return res.status(201).json({
      success: true,
      data: business
    });

  } catch (error) {
    console.error(`[Business Controller] Register Business Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to register business',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Get business details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getBusinessDetails = async (req, res) => {
  try {
    const { businessId } = req.params;
    
    // Get business details
    const business = await businessService.getBusinessById(businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: business
    });

  } catch (error) {
    console.error(`[Business Controller] Get Business Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to get business details',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Update business details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    
    // Check if user owns the business
    const business = await businessService.getBusinessById(businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    if (business.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this business'
      });
    }

    // Update business
    const updatedBusiness = await businessService.updateBusiness(businessId, updateData);

    // Log activity
    await logUserActivity(userId, 'business_updated', {
      businessId,
      updatedFields: Object.keys(updateData)
    });

    return res.status(200).json({
      success: true,
      data: updatedBusiness
    });

  } catch (error) {
    console.error(`[Business Controller] Update Business Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to update business',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

/**
 * Delete a business
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const userId = req.user.id;
    
    // Check if user owns the business
    const business = await businessService.getBusinessById(businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    if (business.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this business'
      });
    }

    // Delete business
    await businessService.deleteBusiness(businessId);

    // Log activity
    await logUserActivity(userId, 'business_deleted', {
      businessId,
      businessName: business.name
    });

    return res.status(200).json({
      success: true,
      message: 'Business deleted successfully'
    });

  } catch (error) {
    console.error(`[Business Controller] Delete Business Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete business',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};