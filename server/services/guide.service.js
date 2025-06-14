//guide.service.js
import supabase from '../DB/connectionDb.js';

/**
 * Get all guides
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of guide objects
 */
export const getAllGuides = async (options = {}) => {
  const { category, limit = 50, offset = 0, searchTerm } = options;
  
  let query = supabase
    .from('guides')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  // Apply category filter if provided
  if (category) {
    query = query.eq('category', category);
  }
  
  // Apply search filter if provided
  if (searchTerm) {
    query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
  }
  
  const { data, error } = await query;
  
  if (error) throw new Error('Failed to fetch guides: ' + error.message);
  return data;
};

/**
 * Get guide by ID
 * @param {string} guideId - Guide ID
 * @returns {Promise<Object>} - Guide object
 */
export const getGuideById = async (guideId) => {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('id', guideId)
    .single();
  
  if (error) throw new Error('Failed to fetch guide: ' + error.message);
  return data;
};

/**
 * Create a new guide (admin only)
 * @param {Object} guideData - Guide data
 * @returns {Promise<Object>} - Created guide object
 */
export const createGuide = async (guideData) => {
  const { title, content, category, author_id, is_published = true } = guideData;
  
  const { data, error } = await supabase
    .from('guides')
    .insert([{
      title,
      content,
      category,
      author_id,
      is_published,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw new Error('Failed to create guide: ' + error.message);
  return data;
};

/**
 * Update a guide (admin only)
 * @param {string} guideId - Guide ID
 * @param {Object} guideData - Updated guide data
 * @returns {Promise<Object>} - Updated guide object
 */
export const updateGuide = async (guideId, guideData) => {
  const { title, content, category, is_published } = guideData;
  
  const updateData = {
    updated_at: new Date().toISOString()
  };
  
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (category !== undefined) updateData.category = category;
  if (is_published !== undefined) updateData.is_published = is_published;
  
  const { data, error } = await supabase
    .from('guides')
    .update(updateData)
    .eq('id', guideId)
    .select()
    .single();
  
  if (error) throw new Error('Failed to update guide: ' + error.message);
  return data;
};

/**
 * Delete a guide (admin only)
 * @param {string} guideId - Guide ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteGuide = async (guideId) => {
  const { error } = await supabase
    .from('guides')
    .delete()
    .eq('id', guideId);
  
  if (error) throw new Error('Failed to delete guide: ' + error.message);
  return true;
};

/**
 * Get guide categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const getGuideCategories = async () => {
  const { data, error } = await supabase
    .from('guide_categories')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) throw new Error('Failed to fetch guide categories: ' + error.message);
  return data;
};

/**
 * Create a guide category (admin only)
 * @param {Object} categoryData - Category data
 * @returns {Promise<Object>} - Created category object
 */
export const createGuideCategory = async (categoryData) => {
  const { name, description } = categoryData;
  
  const { data, error } = await supabase
    .from('guide_categories')
    .insert([{
      name,
      description,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw new Error('Failed to create guide category: ' + error.message);
  return data;
};

/**
 * Update a guide category (admin only)
 * @param {string} categoryId - Category ID
 * @param {Object} categoryData - Updated category data
 * @returns {Promise<Object>} - Updated category object
 */
export const updateGuideCategory = async (categoryId, categoryData) => {
  const { name, description } = categoryData;
  
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  
  const { data, error } = await supabase
    .from('guide_categories')
    .update(updateData)
    .eq('id', categoryId)
    .select()
    .single();
  
  if (error) throw new Error('Failed to update guide category: ' + error.message);
  return data;
};

/**
 * Delete a guide category (admin only)
 * @param {string} categoryId - Category ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteGuideCategory = async (categoryId) => {
  const { error } = await supabase
    .from('guide_categories')
    .delete()
    .eq('id', categoryId);
  
  if (error) throw new Error('Failed to delete guide category: ' + error.message);
  return true;
};