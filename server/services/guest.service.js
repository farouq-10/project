//guest.service.js
import supabase from '../DB/connectionDb.js';
import QRCode from 'qrcode';

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
 * Add a guest to an event
 * @param {Object} guestData - Guest data
 * @returns {Promise<Object>} - Created guest object
 */
export const addGuest = async (guestData) => {
  const { eventId, name, email, phone, status } = guestData;

  // Check if guest with same email already exists for this event
  const { data: existingGuest, error: checkError } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', eventId)
    .eq('email', email)
    .single();

  if (existingGuest) {
    throw new Error('A guest with this email already exists for this event');
  }

  // Create guest
  const { data, error } = await supabase
    .from('guests')
    .insert([{
      event_id: eventId,
      name,
      email,
      phone,
      status,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error('Failed to add guest: ' + error.message);
  return data;
};

/**
 * Get all guests for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - Array of guest objects
 */
export const getEventGuests = async (eventId) => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Update a guest
 * @param {string} guestId - Guest ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated guest object
 */
export const updateGuest = async (guestId, updateData) => {
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', guestId)
    .select()
    .single();

  if (error) throw new Error('Failed to update guest: ' + error.message);
  return data;
};

/**
 * Delete a guest
 * @param {string} guestId - Guest ID
 * @returns {Promise<void>}
 */
export const deleteGuest = async (guestId) => {
  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', guestId);

  if (error) throw new Error('Failed to delete guest: ' + error.message);
};

/**
 * Generate QR codes for all guests of an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - Array of guest objects with QR codes
 */
export const generateGuestQRCodes = async (eventId) => {
  // Get all guests for the event
  const guests = await getEventGuests(eventId);

  // Generate QR code for each guest
  const guestsWithQRCodes = await Promise.all(guests.map(async (guest) => {
    const qrData = {
      type: 'guest',
      eventId,
      guestId: guest.id,
      name: guest.name,
      email: guest.email
    };

    // Generate QR code as data URL
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData), {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 300
    });

    return {
      ...guest,
      qrCode
    };
  }));

  return guestsWithQRCodes;
};

/**
 * Generate QR code for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Object>} - Event object with QR code
 */
export const generateEventQRCode = async (eventId) => {
  // Get event details
  const event = await getEventById(eventId);

  const qrData = {
    type: 'event',
    eventId,
    title: event.event_title,
    date: event.event_date,
    time: event.event_time,
    location: event.location_id
  };

  // Generate QR code as data URL
  const qrCode = await QRCode.toDataURL(JSON.stringify(qrData), {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 300
  });

  return {
    ...event,
    qrCode
  };
};