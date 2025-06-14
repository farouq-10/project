//support.service.js
import supabase from '../DB/connectionDb.js';

/**
 * Submit a support ticket
 * @param {Object} ticketData - Ticket data
 * @returns {Promise<Object>} - Created ticket object
 */
export const submitTicket = async (ticketData) => {
  const { userId, name, email, subject, message, category } = ticketData;

  // Create ticket
  const { data, error } = await supabase
    .from('support_tickets')
    .insert([{
      user_id: userId || null,
      name,
      email,
      subject,
      message,
      category,
      status: 'open',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error('Failed to submit ticket: ' + error.message);
  return data;
};

/**
 * Get user tickets
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of ticket objects
 */
export const getUserTickets = async (userId) => {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Get ticket by ID
 * @param {string} ticketId - Ticket ID
 * @returns {Promise<Object>} - Ticket object
 */
export const getTicketById = async (ticketId) => {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('id', ticketId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Update ticket status
 * @param {string} ticketId - Ticket ID
 * @param {string} status - New status
 * @returns {Promise<Object>} - Updated ticket object
 */
export const updateTicketStatus = async (ticketId, status) => {
  if (!['open', 'in_progress', 'resolved', 'closed'].includes(status)) {
    throw new Error('Invalid status');
  }

  const { data, error } = await supabase
    .from('support_tickets')
    .update({ status })
    .eq('id', ticketId)
    .select()
    .single();

  if (error) throw new Error('Failed to update ticket status: ' + error.message);
  return data;
};

/**
 * Add a reply to a ticket
 * @param {Object} replyData - Reply data
 * @returns {Promise<Object>} - Created reply object
 */
export const addTicketReply = async (replyData) => {
  const { ticketId, userId, isAdmin, message } = replyData;

  // Create reply
  const { data, error } = await supabase
    .from('support_replies')
    .insert([{
      ticket_id: ticketId,
      user_id: userId,
      is_admin: isAdmin || false,
      message,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error('Failed to add reply: ' + error.message);
  return data;
};

/**
 * Get ticket replies
 * @param {string} ticketId - Ticket ID
 * @returns {Promise<Array>} - Array of reply objects
 */
export const getTicketReplies = async (ticketId) => {
  const { data, error } = await supabase
    .from('support_replies')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};