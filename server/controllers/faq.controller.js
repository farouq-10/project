// faq.controller.js
import * as faqService from '../services/faq.service.js';

/**
 * Get all FAQs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await faqService.getAllFAQs();

    // Group FAQs by category
    const groupedFAQs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push({
        question: faq.question,
        answer: faq.answer,
        category: faq.category
      });
      return acc;
    }, {});

    // Convert to array format expected by frontend
    const faqCategories = Object.keys(groupedFAQs).map(title => ({
      title,
      items: groupedFAQs[title]
    }));

    res.status(200).json({
      success: true,
      data: faqCategories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get FAQs by category
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getFAQsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const faqs = await faqService.getFAQsByCategory(category);

    res.status(200).json({
      success: true,
      data: {
        title: category,
        items: faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer,
          category: faq.category
        }))
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Search FAQs
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const searchFAQs = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const faqs = await faqService.searchFAQs(query);

    // Group search results by category
    const groupedFAQs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push({
        question: faq.question,
        answer: faq.answer,
        category: faq.category
      });
      return acc;
    }, {});

    // Convert to array format expected by frontend
    const faqCategories = Object.keys(groupedFAQs).map(title => ({
      title,
      items: groupedFAQs[title]
    }));

    res.status(200).json({
      success: true,
      data: faqCategories
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Create a new FAQ (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const createFAQ = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can create FAQs'
      });
    }
    
    const { question, answer, category } = req.body;
    
    // Validate required fields
    if (!question || !answer || !category) {
      return res.status(400).json({
        success: false,
        message: 'Question, answer, and category are required fields'
      });
    }
    
    // Create new FAQ
    const newFAQ = await faqService.createFAQ({
      question,
      answer,
      category
    });
    
    res.status(201).json({
      success: true,
      data: newFAQ
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

/**
 * Update an existing FAQ (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const updateFAQ = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can update FAQs'
      });
    }
    
    const { id } = req.params;
    const { question, answer, category } = req.body;
    
    // Validate required fields
    if (!question || !answer || !category) {
      return res.status(400).json({
        success: false,
        message: 'Question, answer, and category are required fields'
      });
    }
    
    // Update FAQ
    const updatedFAQ = await faqService.updateFAQ(id, {
      question,
      answer,
      category
    });
    
    res.status(200).json({
      success: true,
      data: updatedFAQ
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete an FAQ (admin only)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const deleteFAQ = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can delete FAQs'
      });
    }
    
    const { id } = req.params;
    
    // Delete FAQ
    await faqService.deleteFAQ(id);
    
    res.status(200).json({
      success: true,
      message: `FAQ with ID ${id} deleted successfully`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};