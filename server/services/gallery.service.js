//gallery.service.js
import supabase from '../DB/connectionDb.js';

/**
 * Get event by ID
 * @param {string} id - Event ID
 * @returns {Promise<Object>} - Event object
 */
export const getEventById = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Upload images to an event gallery
 * @param {string} eventId - Event ID
 * @param {Array} files - Array of file objects
 * @returns {Promise<Array>} - Array of uploaded image objects
 */
export const uploadEventImages = async (eventId, files) => {
  try {
    const uploadPromises = files.map(async (file) => {
      // Generate a unique file name
      const fileName = `${eventId}_${Date.now()}_${file.originalname}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600'
        });

      if (error) throw new Error(`Failed to upload image: ${error.message}`);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName);

      // Create record in gallery table
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery')
        .insert([{
          event_id: eventId,
          image_url: urlData.publicUrl,
          file_name: fileName,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (galleryError) throw new Error(`Failed to save image record: ${galleryError.message}`);
      
      return galleryData;
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error in uploadEventImages:', error);
    throw error;
  }
};

/**
 * Get all images for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - Array of image objects
 */
export const getEventImages = async (eventId) => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get event images: ${error.message}`);
  return data;
};

/**
 * Get image by ID
 * @param {string} id - Image ID
 * @returns {Promise<Object>} - Image object
 */
export const getImageById = async (id) => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to get image: ${error.message}`);
  return data;
};

/**
 * Delete an image
 * @param {string} id - Image ID
 * @returns {Promise<void>}
 */
export const deleteImage = async (id) => {
  try {
    // Get image details first
    const image = await getImageById(id);
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('event-images')
      .remove([image.file_name]);

    if (storageError) throw new Error(`Failed to delete image from storage: ${storageError.message}`);
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (dbError) throw new Error(`Failed to delete image record: ${dbError.message}`);
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
};