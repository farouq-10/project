//guide.validators.js
import Joi from 'joi';

// Schema for creating/updating a guide
export const guideSchema = Joi.object({
  title: Joi.string().min(5).max(200).required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 5 characters long',
      'string.max': 'Title cannot exceed 200 characters'
    }),
  
  content: Joi.string().min(50).required()
    .messages({
      'string.empty': 'Content is required',
      'string.min': 'Content must be at least 50 characters long'
    }),
  
  category: Joi.string().required()
    .messages({
      'string.empty': 'Category is required'
    }),
  
  is_published: Joi.boolean().default(true)
    .messages({
      'boolean.base': 'Published status must be a boolean value'
    })
});

// Schema for creating/updating a guide category
export const guideCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters long',
      'string.max': 'Category name cannot exceed 50 characters'
    }),
  
  description: Joi.string().max(500).allow('', null)
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
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