import { validateVenueData } from "../validators/venueValidators.js";
import logger from "../utils/activityLogger.js";
import { v4 as uuidv4 } from 'uuid';

// تعريف هيكل البيانات المتوقع للمرفق (لإعادة استخدامه في التوثيق)
const VENUE_SCHEMA = {
  name: { type: "string", required: true },
  location: { type: "string", required: true },
  capacity: { type: "number", required: true, min: 1 },
  price: { type: "number", required: true, min: 0 },
  image_url: { type: "string", required: false, format: "url" },
  description: { type: "string", required: false }
};

export const venueValidationMiddleware = async (req, res, next) => {
  const requestId = uuidv4(); // معرف فريد لكل طلب
  const logContext = { 
    requestId,
    endpoint: req.originalUrl,
    method: req.method,
    ip: req.ip
  };

  try {
    // 1. التحقق من نوع المحتوى (Content-Type)
    if (!req.is('application/json')) {
      logger.warn('Invalid content type', {
        ...logContext,
        contentType: req.headers['content-type']
      });
      
      return res.status(415).json({
        success: false,
        message: "Unsupported Media Type: Only JSON is accepted",
        requestId,
        accepted_content_types: ["application/json"],
        documentation: "https://your-api-docs.com/content-types"
      });
    }

    // 2. التحقق من وجود البيانات الأساسية
    if (!req.body || Object.keys(req.body).length === 0) {
      logger.warn('Empty request body received', logContext);
      
      return res.status(400).json({
        success: false,
        message: "Request body is missing or empty",
        requestId,
        expected_schema: VENUE_SCHEMA,
        example_request: {
          name: "Grand Hall",
          location: "Downtown",
          capacity: 500,
          price: 2000,
          image_url: "https://example.com/venue.jpg",
          description: "A spacious hall for events"
        }
      });
    }

    // 3. التحقق من حجم البيانات (Payload Size)
    const contentLength = parseInt(req.headers['content-length']) || 0;
    if (contentLength > 1024 * 10) { // 10KB كحد أقصى
      logger.warn('Payload too large', {
        ...logContext,
        contentLength
      });
      
      return res.status(413).json({
        success: false,
        message: "Payload too large",
        requestId,
        max_size: "10KB"
      });
    }

    // 4. تنفيذ التحقق من الصحة
    const validation = await validateVenueData(req.body);

    // 5. التعامل مع نتيجة التحقق
    if (!validation.valid) {
      logger.warn('Validation failed', {
        ...logContext,
        errors: validation.errors,
        received_data: req.body
      });

      return res.status(422).json({
        success: false,
        message: "Venue data validation failed",
        requestId,
        errors: validation.errors.map(err => ({
          field: err.path.join('.') || 'general',
          message: err.message,
          type: err.type
        })),
        expected_schema: VENUE_SCHEMA,
        documentation: "https://your-api-docs.com/venue-requirements"
      });
    }

    // 6. إذا كانت البيانات صالحة
    logger.debug('Validation passed', {
      ...logContext,
      venue_data: {
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity
      }
    });

    // تخزين البيانات الصحيحة في Request لاستخدامها لاحقاً
    req.validatedVenueData = validation.data || req.body;
    next();

  } catch (error) {
    // 7. التعامل مع الأخطاء غير المتوقعة
    logger.error('Validation middleware crashed', {
      ...logContext,
      error: error.message,
      stack: error.stack,
      body: JSON.stringify(req.body)
    });

    return res.status(500).json({
      success: false,
      message: "Internal validation error",
      requestId,
      error_id: uuidv4(),
      contact_support: "support@yourapi.com",
      support_reference: `VAL-${Date.now()}`
    });
  }
};