// validators/user.validators.js
import Joi from 'joi';

// Enhanced error messages with security considerations
const errorMessages = {
  required: 'This field is required',
  email: {
    invalid: 'Must be a valid email address',
    exists: 'Email already in use'
  },
  min: (length) => `Must be at least ${length} characters`,
  max: (length) => `Cannot exceed ${length} characters`,
  password: {
    complexity: 'Must include uppercase, lowercase, number, and special character',
    common: 'Password is too common or easily guessable',
    pwned: 'This password has been exposed in data breaches'
  },
  phone: {
    invalid: 'Must be a valid phone number',
    exists: 'Phone number already registered',
    format: 'Must be a valid international phone number',
    length: 'Phone number must be 10-15 digits'
  },
  confirmation: 'Fields do not match'
};

// Reusable validation rules
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 standard
const namePattern = /^[a-zA-Z]+$/;

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.min': errorMessages.min(2),
      'string.max': errorMessages.max(50),
      'string.pattern.base': 'Only letters allowed',
      'any.required': errorMessages.required
    }),

  secondName: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.min': errorMessages.min(2),
      'string.max': errorMessages.max(50),
      'string.pattern.base': 'Only letters allowed',
      'any.required': errorMessages.required
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.email': errorMessages.email.invalid,
      'string.max': errorMessages.max(320),
      'any.required': errorMessages.required
    }),

  phone: Joi.string()
    .pattern(phonePattern)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.pattern.base': errorMessages.phone.format,
      'any.required': errorMessages.required
    }),

  password: Joi.string()
    .min(12)
    .pattern(passwordPattern)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.min': errorMessages.min(12),
      'string.pattern.base': errorMessages.password.complexity,
      'any.required': errorMessages.required
    })
}).options({ abortEarly: false, allowUnknown: false });

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.email': errorMessages.email.invalid,
      'any.required': errorMessages.required
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'any.required': errorMessages.required
    })
}).options({ abortEarly: false, allowUnknown: false });

export const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.email': errorMessages.email.invalid,
      'any.required': errorMessages.required
    })
}).options({ abortEarly: false, allowUnknown: false });

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'any.required': errorMessages.required
    }),

  newPassword: Joi.string()
    .min(12)
    .pattern(passwordPattern)
    .invalid(Joi.ref('currentPassword'))
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.min': errorMessages.min(12),
      'string.pattern.base': errorMessages.password.complexity,
      'any.invalid': 'New password must be different from current',
      'any.required': errorMessages.required
    }),

  confirmNewPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'any.only': errorMessages.confirmation,
      'any.required': errorMessages.required
    })
}).options({ abortEarly: false, allowUnknown: false });

export const updateProfileSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .messages({
      'string.min': errorMessages.min(2),
      'string.max': errorMessages.max(50),
      'string.pattern.base': 'Only letters allowed'
    }),

  secondName: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .messages({
      'string.min': errorMessages.min(2),
      'string.max': errorMessages.max(50),
      'string.pattern.base': 'Only letters allowed'
    }),

  phone: Joi.string()
    .pattern(phonePattern)
    .messages({
      'string.pattern.base': errorMessages.phone.format
    })
}).options({ abortEarly: false, allowUnknown: false });

// Schema for OAuth users (less strict requirements since auth is handled by provider)
export const oauthUserSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.min': errorMessages.min(1),
      'string.max': errorMessages.max(50),
      'any.required': errorMessages.required
    }),

  secondName: Joi.string()
    .min(0)
    .max(50)
    .allow('')
    .messages({
      'string.max': errorMessages.max(50)
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .required()
    .messages({
      'string.empty': errorMessages.required,
      'string.email': errorMessages.email.invalid,
      'string.max': errorMessages.max(320),
      'any.required': errorMessages.required
    }),

  phone: Joi.string()
    .pattern(phonePattern)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': errorMessages.phone.format
    }),

  provider: Joi.string()
    .valid('google', 'facebook', 'apple', 'linkedin')
    .required()
    .messages({
      'any.only': 'Provider must be one of the supported OAuth providers',
      'any.required': 'OAuth provider is required'
    })
}).options({ abortEarly: false, allowUnknown: false });

// Enhanced validation helper with context
export const validateData = async (schema, data, context = {}) => {
  try {
    const validatedData = await schema.validateAsync(data, {
      abortEarly: false,
      context,
      stripUnknown: true
    });
    return { isValid: true, data: validatedData, errors: null };
  } catch (error) {
    if (error.details) {
      const errors = error.details.reduce((acc, err) => {
        const key = err.path.join('.');
        if (!acc[key]) {
          acc[key] = err.message;
        }
        return acc;
      }, {});
      return { isValid: false, data: null, errors };
    }
    return { isValid: false, data: null, errors: { general: error.message } };
  }
};