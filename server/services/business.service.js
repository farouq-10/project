//business.service.js
import supabase from '../DB/connectionDb.js';

/**
 * Register a new business
 * @param {Object} businessData - Business data
 * @returns {Promise<Object>} - Created business object
 */
export const registerBusiness = async (businessData) => {
  const { userId, name, type, address, phone, email, description, website, socialMedia } = businessData;

  // Check if business with same email already exists
  const { data: existingBusiness, error: checkError } = await supabase
    .from('businesses')
    .select('*')
    .eq('email', email)
    .single();

  if (existingBusiness) {
    throw new Error('A business with this email already exists');
  }

  // Create business
  const { data, error } = await supabase
    .from('businesses')
    .insert([{
      user_id: userId,
      name,
      type,
      address,
      phone,
      email,
      description,
      website: website || null,
      social_media: socialMedia || null,
      status: 'pending', // Initial status pending for approval
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error('Failed to register business: ' + error.message);
  return data;
};

/**
 * Get business by ID
 * @param {string} id - Business ID
 * @returns {Promise<Object>} - Business object
 */
export const getBusinessById = async (id) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Get businesses by user ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of business objects
 */
export const getUserBusinesses = async (userId) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Update a business
 * @param {string} id - Business ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated business object
 */
export const updateBusiness = async (id, updateData) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error('Failed to update business: ' + error.message);
  return data;
};

/**
 * Delete a business
 * @param {string} id - Business ID
 * @returns {Promise<void>}
 */
export const deleteBusiness = async (id) => {
  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete business: ' + error.message);
};

/**
 * Get all businesses (for admin)
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} - Array of business objects
 */
export const getAllBusinesses = async (filters = {}) => {
  const { status, type, page = 1, pageSize = 10 } = filters;
  
  let query = supabase.from('businesses').select('*');
  
  if (status) query = query.eq('status', status);
  if (type) query = query.eq('type', type);
  
  query = query
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const { data, error } = await query;

  if (error) throw new Error('Failed to get businesses: ' + error.message);
  return data;
};

/**
 * Approve or reject a business
 * @param {string} id - Business ID
 * @param {string} status - New status ('approved' or 'rejected')
 * @param {string} adminId - Admin user ID
 * @returns {Promise<Object>} - Updated business object
 */
export const updateBusinessStatus = async (id, status, adminId) => {
  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('Invalid status. Must be either "approved" or "rejected"');
  }

  const { data, error } = await supabase
    .from('businesses')
    .update({
      status,
      approved_by: status === 'approved' ? adminId : null,
      approved_at: status === 'approved' ? new Date().toISOString() : null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error('Failed to update business status: ' + error.message);
  return data;
};