//support.validators.js
import Joi from 'joi';

// Schema for submitting a support ticket
export const submitTicketSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters'
    }),
  
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  
  subject: Joi.string().min(5).max(200).required()
    .messages({
      'string.empty': 'Subject is required',
      'string.min': 'Subject must be at least 5 characters long',
      'string.max': 'Subject cannot exceed 200 characters'
    }),
  
  message: Joi.string().min(10).max(2000).required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 2000 characters'
    }),
  
  category: Joi.string().valid('general', 'technical', 'billing', 'feature_request', 'bug_report', 'other').required()
    .messages({
      'string.empty': 'Category is required',
      'any.only': 'Category must be one of: general, technical, billing, feature_request, bug_report, other'
    })
});

// Schema for updating ticket status
export const updateTicketStatusSchema = Joi.object({
  status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed').required()
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of: open, in_progress, resolved, closed'
    })
});

// Schema for adding a reply to a ticket
export const addTicketReplySchema = Joi.object({
  message: Joi.string().min(1).max(2000).required()
    .messages({
      'string.empty': 'Reply message is required',
      'string.min': 'Reply message must not be empty',
      'string.max': 'Reply message cannot exceed 2000 characters'
    })
});

// Function to validate data against a schema
export const validateData = async (schema, data) => {
  try {
    await schema.validateAsync(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return { isValid: false, errors };
  }
};