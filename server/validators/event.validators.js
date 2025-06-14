//event validator.js
import Joi from 'joi';

export const createEventValidator = Joi.object({
  eventTitle: Joi.string().required().messages({
    'string.empty': 'Event title is required.',
  }),
  eventType: Joi.string().valid('wedding', 'engagement', 'birthday', 'seminar', 'workshop').required().messages({
    'any.only': 'Event type must be one of the following: wedding, engagement, birthday, seminar, workshop.',
  }),
  eventDate: Joi.date().greater('now').required().messages({
    'date.greater': 'The event date must be in the future.',
    'date.base': 'Invalid date format.',
  }),
  eventTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
    'string.pattern.base': 'Event time must be in HH:MM (24-hour format).',
  }),
  maxCapacity: Joi.number().integer().positive().required().messages({
    'number.base': 'Max capacity must be a positive integer.',
  }),
  locationId: Joi.string().required().messages({
    'string.empty': 'Location ID is required.',
  }),
  venueId: Joi.string().required().messages({
    'string.empty': 'Venue ID is required.',
  }),
  userId: Joi.string().required().messages({
    'string.empty': 'User ID is required.',
  }),
  isPrivate: Joi.boolean().required().messages({
    'boolean.base': 'Is private field must be a boolean.',
  }),
  eventDescription: Joi.string().optional().allow('').messages({
    'string.base': 'Event description should be a string.',
  }),
  specialGuests: Joi.string().optional().allow('').messages({
    'string.base': 'Special guests should be a string.',
  }),
});


export const filterEventsSchema = Joi.object({
  eventType: Joi.string().optional(),
  eventTitle: Joi.string().optional(),
  minDate: Joi.date().iso().optional(),
  maxDate: Joi.date().iso().optional(),
  maxCapacity: Joi.number().integer().min(1).optional(),
  locationId: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().valid('event_date', 'max_capacity').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional()
}).custom((value, helper) => {
  // التأكد من أن maxDate لا يكون أقل من minDate
  if (value.minDate && value.maxDate && new Date(value.minDate) > new Date(value.maxDate)) {
    return helper.message('maxDate cannot be earlier than minDate');
  }
  return value;
});
