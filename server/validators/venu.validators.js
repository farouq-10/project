// venu.validators
import Joi from 'joi';

const venueSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    
  location: Joi.string()
    .required()
    .messages({
      'string.empty': 'Location is required',
      'any.required': 'Location is required'
    }),
    
  capacity: Joi.number()
    .required()
    .min(1)
    .messages({
      'number.base': 'Capacity is required',
      'number.min': 'Must be at least 1',
      'any.required': 'Capacity is required'
    }),
    
  price: Joi.number()
    .required()
    .min(0)
    .messages({
      'number.base': 'Price is required',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),
    
  image_url: Joi.string()
    .uri()
    .allow(null)
    .messages({
      'string.uri': 'Image URL must be valid'
    }),
    
  description: Joi.string()
    .allow(null)
}).options({ abortEarly: false });

// النسخة المحسنة مع الحفاظ على الأصل
export const validateVenueData = async (venueData) => {
  try {
    await venueSchema.validateAsync(venueData);
    return { valid: true };
  } catch (error) {
    if (error.details) {
      const errors = error.details.map((e) => ({
        path: e.path,
        message: e.message
      }));
      return { valid: false, errors };
    }
    return { valid: false, errors: [{ path: ['general'], message: error.message }] };
  }
};

// ميدلوير التحقق من صحة بيانات المرافق
export const venueValidationMiddleware = async (req, res, next) => {
  const { valid, errors } = await validateVenueData(req.body);
  if (!valid) {
    return res.status(400).json({ 
      success: false,
      errors 
    });
  }
  next();
};