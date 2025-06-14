//event.route
import express from 'express';
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getUserEvents,
  getFilteredEvents,
} from '../controllers/event.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { createEventValidator } from '../validators/event.validators.js';

import Joi from 'joi';

const router = express.Router();

// إنشاء حدث جديد
router.post('/events', async (req, res, next) => {
  try {
    await createEventValidator.validateAsync(req.body);
    next(); // إذا كانت المدخلات صحيحة، انتقل إلى منطق إنشاء الحدث
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
}, createEvent);

// الحصول على الأحداث الخاصة بالمستخدم
router.get('/', authMiddleware, getUserEvents);

// الحصول على حدث محدد بواسطة ID
router.get('/:id', authMiddleware, getEvent);

// تعديل حدث بناءً على ID
router.put('/:id', authMiddleware, updateEvent);

// حذف حدث بناءً على ID
router.delete('/:id', authMiddleware, deleteEvent);

// الحصول على الأحداث باستخدام الفلاتر (مثل نوع الحدث، التاريخ، السعة، وغيرها) مع Pagination
router.get('/filter/events', authMiddleware, getFilteredEvents);

export default router;
