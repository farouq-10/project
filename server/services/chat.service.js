//chat.service.js
import supabase from '../DB/connectionDb.js';
import { io } from '../app.js'; // Import io from app.js

/**
 * Save a chat message
 * @param {Object} messageData - Message data
 * @returns {Promise<Object>} - Created message object
 */
export const saveMessage = async (messageData) => {
  const { senderId, receiverId, content, eventId } = messageData;

  // Create message
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      event_id: eventId || null,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw new Error('Failed to save message: ' + error.message);
  
  // Send real-time notification via Socket.io
  if (data) {
    // For direct messages between users
    if (receiverId) {
      // Find all connected sockets
      const connectedSockets = Array.from(io.sockets.sockets.values());
      // Find the socket associated with the receiver
      const receiverSocket = connectedSockets.find(socket => socket.userId === receiverId);
      
      if (receiverSocket) {
        receiverSocket.emit('newMessage', data);
      } else {
        console.log(`User ${receiverId} is not currently connected. Message will be delivered when they reconnect.`);
      }
    }
    
    // For event chat messages
    if (eventId) {
      io.emit('newEventMessage', { ...data, eventId });
    }
  }
  
  return data;
};

/**
 * Get chat messages between two users
 * @param {string} userId - Current user ID
 * @param {string} otherUserId - Other user ID
 * @returns {Promise<Array>} - Array of message objects
 */
export const getUserMessages = async (userId, otherUserId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Get event chat messages
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - Array of message objects
 */
export const getEventMessages = async (eventId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Delete a message
 * @param {string} messageId - Message ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Promise<void>}
 */
export const deleteMessage = async (messageId, userId) => {
  // Check if user owns the message
  const { data: message, error: checkError } = await supabase
    .from('messages')
    .select('*')
    .eq('id', messageId)
    .single();

  if (checkError) throw new Error(checkError.message);
  
  if (message.sender_id !== userId) {
    throw new Error('You do not have permission to delete this message');
  }

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) throw new Error('Failed to delete message: ' + error.message);
};