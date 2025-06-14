//booking validator
// validators/booking.validators.js

import Joi from 'joi';

// تحقق من الحقول المطلوبة عند تأكيد الحجز
export const confirmBookingSchema = Joi.object({
  bookingId: Joi.number().integer().required().messages({
    'number.base': 'Booking ID should be a number.',
    'any.required': 'Booking ID is required.',
  }),
  userId: Joi.number().integer().required().messages({
    'number.base': 'User ID should be a number.',
    'any.required': 'User ID is required.',
  }),
});

// تحقق من الحقول المطلوبة عند إلغاء الحجز
export const cancelBookingSchema = Joi.object({
  bookingId: Joi.number().integer().required().messages({
    'number.base': 'Booking ID should be a number.',
    'any.required': 'Booking ID is required.',
  }),
});
