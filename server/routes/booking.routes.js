//booking route
// booking route
// routes/booking.routes.js

// routes/booking.routes.js

import express from 'express';
import { confirmBooking, cancelBooking } from '../controllers/booking.controller.js'; // استيراد الـ controller
import { validate } from '../middlewares/validate.js'; // استيراد الميديلوير
import { confirmBookingSchema, cancelBookingSchema } from '../validators/booking.validators.js'; // استيراد الـ validators

const router = express.Router();

// مسار لتأكيد الحجز مع التحقق
router.put('/confirm/:bookingId', validate(confirmBookingSchema), async (req, res) => {
  const { bookingId } = req.params;
  const { userId } = req.body; // تأكد من إرسال الـ userId في الـ request body
  
  try {
    const updatedBooking = await confirmBooking({ bookingId, userId });
    res.status(200).json(updatedBooking); // إرجاع الحجز المؤكد
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// مسار لإلغاء الحجز مع التحقق
router.delete('/cancel/:bookingId', validate(cancelBookingSchema), async (req, res) => {
  const { bookingId } = req.params;
  
  try {
    const result = await cancelBooking(bookingId);
    res.status(200).json(result); // إرجاع رسالة نجاح الإلغاء
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
