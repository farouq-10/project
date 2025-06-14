//venueController,js
import * as venueService from "../services/venue.services.js";


export const createVenue = async (req, res) => {
  const requestId = req.requestId || uuidv4(); // استخدام requestId من middleware أو إنشاء جديد
  const auditInfo = {
    userId: req.user?.id,
    userIp: req.ip,
    userAgent: req.headers['user-agent'],
    requestId
  };

  try {
    // 1. استخدام البيانات المفحوصة من middleware بدلاً من req.body مباشرة
    const venueData = req.validatedVenueData || req.body;

    // 2. إضافة معلومات المستخدم إن وجدت (من نظام المصادقة)
    if (req.user) {
      venueData.createdBy = req.user.id;
      venueData.owner = req.user.id;
    }

    // 3. تسجيل محاولة إنشاء المرفق
    logger.info('Creating venue', {
      ...auditInfo,
      action: 'venue_creation_start',
      venueData: {
        name: venueData.name,
        location: venueData.location,
        capacity: venueData.capacity
      }
    });

    // 4. استدعاء service مع معالجة الأخطاء المخصصة
    const newVenue = await venueService.createVenue(venueData);

    // 5. تسجيل النجاح
    logger.info('Venue created successfully', {
      ...auditInfo,
      action: 'venue_creation_success',
      venueId: newVenue.id
    });

    // 6. إرسال الاستجابة مع حذف الحقول الحساسة
    const responseData = {
      id: newVenue.id,
      name: newVenue.name,
      location: newVenue.location,
      capacity: newVenue.capacity,
      price: newVenue.price,
      createdAt: newVenue.createdAt
    };

    return res.status(201).json({
      success: true,
      data: responseData,
      _metadata: {
        requestId,
        apiVersion: "1.0",
        links: {
          self: `/venues/${newVenue.id}`,
          owner: `/users/${newVenue.owner}`
        }
      }
    });

  } catch (error) {
    // 7. تصنيف الأخطاء ومعالجتها بشكل مناسب
    let statusCode = 500;
    let errorMessage = error.message;
    let errorType = 'internal_server_error';

    if (error.name === 'ValidationError') {
      statusCode = 400;
      errorType = 'validation_error';
    } else if (error.code === 'DUPLICATE_VENUE') {
      statusCode = 409;
      errorType = 'duplicate_resource';
    } else if (error.name === 'AuthorizationError') {
      statusCode = 403;
      errorType = 'forbidden';
    }

    // 8. تسجيل الخطأ
    logger.error('Venue creation failed', {
      ...auditInfo,
      action: 'venue_creation_failed',
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        type: errorType
      }
    });

    // 9. إرسال استجابة الخطأ
    return res.status(statusCode).json({
      success: false,
      error: {
        type: errorType,
        message: errorMessage,
        requestId,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      _links: {
        documentation: "https://api-docs.example.com/errors/" + errorType,
        support: "mailto:support@example.com?subject=Error-" + requestId
      }
    });
  }
};
export const getAllVenues = async (req, res) => {
  try {
    const { data, count } = await venueService.getAllVenues(req.query);
    res.status(200).json({
      success: true,
      data,
      meta: {
        total: count
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const venue = await venueService.getVenueById(req.params.id);
    if (!venue) {
      return res.status(404).json({ 
        success: false,
        message: 'Venue not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: venue
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const updated = await venueService.updateVenue(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ 
        success: false,
        message: 'Venue not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    await venueService.deleteVenue(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};