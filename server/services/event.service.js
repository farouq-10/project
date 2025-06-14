//event.service
import dayjs from 'dayjs';  // Import dayjs for better date handling
import supabase from '../DB/connectionDb.js';

export const createEvent = async (eventData) => {
  try {
    // 1. Basic validation for required fields
    const requiredFields = {
      eventTitle: 'Event title is required',
      eventType: 'Event type is required',
      eventDate: 'Event date is required',
      eventTime: 'Event time is required',
      maxCapacity: 'Max capacity is required',
      locationId: 'Location ID is required',
      venueId: 'Venue ID is required',
      userId: 'User ID is required'
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!eventData[field]) throw new Error(message);
    });

    if (typeof eventData.isPrivate !== 'boolean') {
      throw new Error('Privacy status must be true or false');
    }

    // 2. Validate the event date and time
    const eventDateTime = dayjs(`${eventData.eventDate}T${eventData.eventTime}`);
    if (eventDateTime.isBefore(dayjs())) {
      throw new Error('Event cannot be created in the past');
    }

    // 3. Check if the venue and location match in a single query
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('id, capacity, location_id')
      .eq('id', eventData.venueId)
      .single();

    if (venueError || !venue) throw new Error('Venue not found');
    if (eventData.locationId !== venue.location_id) {
      throw new Error('The location does not match the venue location');
    }

    // 4. Check for maximum capacity
    if (eventData.maxCapacity > venue.capacity) {
      throw new Error(`Event capacity (${eventData.maxCapacity}) exceeds venue capacity (${venue.capacity})`);
    }

    // 5. Check for scheduling conflicts (same venue, date, and time)
    const { count: conflictCount } = await supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('venue_id', eventData.venueId)
      .eq('event_date', eventData.eventDate)
      .eq('event_time', eventData.eventTime);

    if (conflictCount > 0) {
      throw new Error('The venue is already booked at this date and time');
    }

    // 6. Create the event
    const { data, error } = await supabase
      .from('events')
      .insert([{
        event_title: eventData.eventTitle,
        event_type: eventData.eventType,
        event_date: eventData.eventDate,
        event_time: eventData.eventTime,
        max_capacity: eventData.maxCapacity,
        location_id: eventData.locationId,
        user_id: eventData.userId,
        is_private: eventData.isPrivate,
        venue_id: eventData.venueId,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw new Error('Failed to create event: ' + error.message);

    return data;

  } catch (error) {
    console.error('Error in event creation service:', error);
    throw error;  // Rethrow the error to be handled by the controller
  }
};


export const getEventById = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getUserEvents = async (userId) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
};

export const updateEvent = async (id, updatedData) => {
  const { venueId } = updatedData;

  // التأكد من أن القاعة تكون موجودة إذا تم تحديثها
  if (venueId) {
    const { data: venue, error: venueError } = await supabase
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    if (venueError || !venue) {
      throw new Error("Venue not found");
    }
  }
  const { data, error } = await supabase
    .from('events')
    .update(updatedData)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data;
};



export const filterEvents = async (filters) => {
  const { 
    eventType, 
    eventTitle, 
    minDate, 
    maxDate, 
    maxCapacity, 
    locationId, 
    venueId, 
    page = 1, 
    pageSize = 10, 
    sortBy = 'event_date', 
    sortOrder = 'asc' 
  } = filters;

  let query = supabase.from('events').select('*');

  if (eventType) query = query.eq('event_type', eventType);
  if (eventTitle) query = query.ilike('event_title', `%${eventTitle}%`);
  if (minDate) query = query.gte('event_date', minDate);
  if (maxDate) query = query.lte('event_date', maxDate);
  if (maxCapacity) query = query.lte('max_capacity', maxCapacity);
  if (locationId) query = query.eq('location_id', locationId);
  if (venueId) query = query.eq('venue_id', venueId);
  query = query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
};
// In event.service.js
export const deleteEvent = async (id) => {
  const { data: event, error: findError } = await supabase
    .from('events')
    .select('id')
    .eq('id', id)
    .single();

  if (findError?.code === 'PGRST116') { // Specific code for "not found"
    throw new Error('EVENT_NOT_FOUND');
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw new Error('DELETE_FAILED');
  return { id, deleted: true };
};