//eventController.js
import dayjs from 'dayjs';
import * as eventService from '../services/event.service.js';

/**
 * Creates a new event with comprehensive validation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createEvent = async (req, res) => {
  try {
    const { user, body } = req;
    const requiredFields = [
      'eventTitle', 'eventDate', 'eventTime', 
      'maxCapacity', 'locationId', 'venueId'
    ];

    // Validate required fields
    const missingFields = requiredFields.filter(field => !body[field]);
    const errors = missingFields.map(field => ({
      field,
      message: `${field} is required`
    }));

    if (missingFields.length > 0 || typeof body.isPrivate !== 'boolean') {
      if (typeof body.isPrivate !== 'boolean') {
        errors.push({ field: 'isPrivate', message: 'Must be a boolean value' });
      }

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Validate date and time
    const eventDateTime = dayjs(`${body.eventDate}T${body.eventTime}`);
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Strict 24-hour format

    if (!eventDateTime.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date/time format',
        details: 'Use YYYY-MM-DD for date and HH:mm for time (24-hour format)'
      });
    }

    if (eventDateTime.isBefore(dayjs())) {
      return res.status(400).json({ 
        success: false,
        message: 'Event must be in the future' 
      });
    }

    if (!timeRegex.test(body.eventTime)) {
      return res.status(400).json({ 
        success: false,
        message: 'Time must be in HH:MM 24-hour format' 
      });
    }

    // Prepare event data and create event
    const eventData = {
      ...body,
      eventDate: eventDateTime.format('YYYY-MM-DD'),
      maxCapacity: Number(body.maxCapacity),
      userId: user.id
    };

    const event = await eventService.createEvent(eventData);

    return res.status(201).json({
      success: true,
      data: {
        id: event.id,
        title: event.event_title,
        date: event.event_date,
        time: event.event_time,
        capacity: event.max_capacity,
        venue: event.venue_id,
        isPrivate: event.is_private,
        createdAt: event.created_at
      }
    });

  } catch (error) {
    console.error(`[Event Creation Error] ${error.message}`);
    
    const status = error.message.includes('not found') ? 404 :
                 error.message.includes('capacity') ? 400 :
                 error.message.includes('booked') ? 409 : 500;

    return res.status(status).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: error.stack 
      })
    });
  }
};


/**
 * Get event details by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getEvent = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is private and user is not the owner
    if (event.is_private && event.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to private event'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: event.id,
        title: event.event_title,
        date: event.event_date,
        time: event.event_time,
        venueId: event.venue_id,
        isPrivate: event.is_private,
        creatorId: event.user_id
      }
    });

  } catch (error) {
    console.error(`[Event Controller] Get Event Error: ${error.message}`);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to retrieve event details'
    });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const events = await eventService.getUserEvents(req.user.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    // الحصول على الحدث بناءً على المعرف
    const event = await eventService.getEventById(req.params.id);

    // التحقق من أن المستخدم هو من أنشأ الحدث
    if (event.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this event' });
    }

    // تحديث الحدث إذا كان المالك هو نفس المستخدم
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getFilteredEvents = async (req, res) => {
  try {
    const { error } = filterEventsSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const events = await eventService.filterEvents(req.query);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// In event.controller.js
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Permission check
    const event = await eventService.getEventById(id);
    if (event.user_id !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Missing deletion permissions' 
      });
    }

    await eventService.deleteEvent(id);
    return res.json({ success: true });

  } catch (error) {
    const status = {
      'EVENT_NOT_FOUND': 404,
      'DELETE_FAILED': 500
    }[error.message] || 500;

    return res.status(status).json({
      success: false,
      message: error.message
    });
  }
};