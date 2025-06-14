import Joi from 'joi';

// تعريف الفالديشن الخاص بعملية الدفع
export const createPaymentSchema = Joi.object({
  bookingId: Joi.string().required().messages({
    'any.required': 'Booking ID is required.',
    'string.empty': 'Booking ID cannot be empty.',
  }),
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required.',
    'string.empty': 'User ID cannot be empty.',
  }),
  amount: Joi.number().positive().required().messages({
    'any.required': 'Amount is required.',
    'number.base': 'Amount must be a number.',
    'number.positive': 'Amount must be positive.',
  }),
  method: Joi.string().valid('cash', 'credit', 'paypal').required().messages({
    'any.only': 'Payment method must be one of [cash, credit, paypal].',
    'any.required': 'Payment method is required.',
  }),
});
