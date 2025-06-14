// faq.service.js
import { pool } from '../DB/connectionDb.js';

/**
 * Get all FAQs from the database
 * @returns {Promise<Array>} Array of FAQ objects
 */
export const getAllFAQs = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM faqs ORDER BY category, id');
    return rows;
  } catch (error) {
    console.error('[FAQ Service] Error getting all FAQs:', error.message);
    throw new Error('Failed to retrieve FAQs');
  }
};

/**
 * Get FAQs by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of FAQ objects in the specified category
 */
export const getFAQsByCategory = async (category) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faqs WHERE category = ?', [category]);
    return rows;
  } catch (error) {
    console.error(`[FAQ Service] Error getting FAQs for category ${category}:`, error.message);
    throw new Error(`Failed to retrieve FAQs for category: ${category}`);
  }
};

/**
 * Search FAQs by query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching FAQ objects
 */
export const searchFAQs = async (query) => {
  try {
    const searchPattern = `%${query}%`;
    const [rows] = await pool.query(
      'SELECT * FROM faqs WHERE question LIKE ? OR answer LIKE ?',
      [searchPattern, searchPattern]
    );
    return rows;
  } catch (error) {
    console.error('[FAQ Service] Error searching FAQs:', error.message);
    throw new Error('Failed to search FAQs');
  }
};

/**
 * Create a new FAQ
 * @param {Object} faqData - FAQ data object
 * @param {string} faqData.question - FAQ question
 * @param {string} faqData.answer - FAQ answer
 * @param {string} faqData.category - FAQ category
 * @returns {Promise<Object>} Created FAQ object
 */
export const createFAQ = async (faqData) => {
  try {
    const { question, answer, category } = faqData;
    
    const [result] = await pool.query(
      'INSERT INTO faqs (question, answer, category) VALUES (?, ?, ?)',
      [question, answer, category]
    );
    
    return {
      id: result.insertId,
      question,
      answer,
      category
    };
  } catch (error) {
    console.error('[FAQ Service] Error creating FAQ:', error.message);
    throw new Error('Failed to create FAQ');
  }
};

/**
 * Update an existing FAQ
 * @param {number} id - FAQ ID
 * @param {Object} faqData - Updated FAQ data
 * @returns {Promise<Object>} Updated FAQ object
 */
export const updateFAQ = async (id, faqData) => {
  try {
    const { question, answer, category } = faqData;
    
    await pool.query(
      'UPDATE faqs SET question = ?, answer = ?, category = ? WHERE id = ?',
      [question, answer, category, id]
    );
    
    const [rows] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error(`[FAQ Service] Error updating FAQ ${id}:`, error.message);
    throw new Error(`Failed to update FAQ with ID: ${id}`);
  }
};

/**
 * Delete an FAQ
 * @param {number} id - FAQ ID
 * @returns {Promise<boolean>} True if deleted successfully
 */
export const deleteFAQ = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      throw new Error(`FAQ with ID ${id} not found`);
    }
    
    return true;
  } catch (error) {
    console.error(`[FAQ Service] Error deleting FAQ ${id}:`, error.message);
    throw new Error(`Failed to delete FAQ with ID: ${id}`);
  }
};