//guide.controller.js
import * as guideService from "../services/guide.service.js";
import { logUserActivity } from "../utils/activityLogger.js";
import { guideSchema, guideCategorySchema, validateData } from "../validators/guide.validators.js";

/**
 * Get all guides
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllGuides = async (req, res) => {
  try {
    const { category, limit, offset, search } = req.query;
    
    const options = {
      category,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      searchTerm: search
    };
    
    const guides = await guideService.getAllGuides(options);
    
    return res.status(200).json({
      success: true,
      message: "Guides retrieved successfully",
      data: guides
    });
  } catch (error) {
    console.error("Error retrieving guides:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve guides",
      error: error.message
    });
  }
};

/**
 * Get guide by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getGuideById = async (req, res) => {
  try {
    const { guideId } = req.params;
    const guide = await guideService.getGuideById(guideId);
    
    return res.status(200).json({
      success: true,
      message: "Guide retrieved successfully",
      data: guide
    });
  } catch (error) {
    console.error("Error retrieving guide:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve guide",
      error: error.message
    });
  }
};

/**
 * Create a new guide (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createGuide = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can create guides"
      });
    }
    
    // Validate input data
    const { isValid, errors } = await validateData(guideSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }
    
    const { title, content, category, is_published } = req.body;
    
    const guideData = {
      title,
      content,
      category,
      author_id: req.user.id,
      is_published
    };
    
    const guide = await guideService.createGuide(guideData);
    
    await logUserActivity(req.user.id, 'create_guide', { guideId: guide.id });
    
    return res.status(201).json({
      success: true,
      message: "Guide created successfully",
      data: guide
    });
  } catch (error) {
    console.error("Error creating guide:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create guide",
      error: error.message
    });
  }
};

/**
 * Update a guide (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateGuide = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can update guides"
      });
    }
    
    // Validate input data
    const { isValid, errors } = await validateData(guideSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }
    
    const { guideId } = req.params;
    const { title, content, category, is_published } = req.body;
    
    const guideData = {
      title,
      content,
      category,
      is_published
    };
    
    const guide = await guideService.updateGuide(guideId, guideData);
    
    await logUserActivity(req.user.id, 'update_guide', { guideId });
    
    return res.status(200).json({
      success: true,
      message: "Guide updated successfully",
      data: guide
    });
  } catch (error) {
    console.error("Error updating guide:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update guide",
      error: error.message
    });
  }
};

/**
 * Delete a guide (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteGuide = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can delete guides"
      });
    }
    
    const { guideId } = req.params;
    
    await guideService.deleteGuide(guideId);
    
    await logUserActivity(req.user.id, 'delete_guide', { guideId });
    
    return res.status(200).json({
      success: true,
      message: "Guide deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting guide:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete guide",
      error: error.message
    });
  }
};

/**
 * Get guide categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getGuideCategories = async (req, res) => {
  try {
    const categories = await guideService.getGuideCategories();
    
    return res.status(200).json({
      success: true,
      message: "Guide categories retrieved successfully",
      data: categories
    });
  } catch (error) {
    console.error("Error retrieving guide categories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve guide categories",
      error: error.message
    });
  }
};

/**
 * Create a guide category (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createGuideCategory = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can create guide categories"
      });
    }
    
    // Validate input data
    const { isValid, errors } = await validateData(guideCategorySchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }
    
    const { name, description } = req.body;
    
    const categoryData = {
      name,
      description
    };
    
    const category = await guideService.createGuideCategory(categoryData);
    
    await logUserActivity(req.user.id, 'create_guide_category', { categoryId: category.id });
    
    return res.status(201).json({
      success: true,
      message: "Guide category created successfully",
      data: category
    });
  } catch (error) {
    console.error("Error creating guide category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create guide category",
      error: error.message
    });
  }
};

/**
 * Update a guide category (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateGuideCategory = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can update guide categories"
      });
    }
    
    // Validate input data
    const { isValid, errors } = await validateData(guideCategorySchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
        errorType: "validation_error"
      });
    }
    
    const { categoryId } = req.params;
    const { name, description } = req.body;
    
    const categoryData = {
      name,
      description
    };
    
    const category = await guideService.updateGuideCategory(categoryId, categoryData);
    
    await logUserActivity(req.user.id, 'update_guide_category', { categoryId });
    
    return res.status(200).json({
      success: true,
      message: "Guide category updated successfully",
      data: category
    });
  } catch (error) {
    console.error("Error updating guide category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update guide category",
      error: error.message
    });
  }
};

/**
 * Delete a guide category (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteGuideCategory = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only administrators can delete guide categories"
      });
    }
    
    const { categoryId } = req.params;
    
    await guideService.deleteGuideCategory(categoryId);
    
    await logUserActivity(req.user.id, 'delete_guide_category', { categoryId });
    
    return res.status(200).json({
      success: true,
      message: "Guide category deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting guide category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete guide category",
      error: error.message
    });
  }
};