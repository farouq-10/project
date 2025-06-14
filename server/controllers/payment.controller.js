//payment.controller
import { confirmBooking } from '../services/payment.service.js';  // استيراد دالة confirmBooking

// دالة التعامل مع الدفع
export const handleCreatePayment = async (req, res, next) => {
  try {
    // استخراج البيانات من الجسم (body)
    const { bookingId, userId, amount, method } = req.body;

    // استدعاء دالة confirmBooking لتأكيد الحجز وإنشاء الدفع
    const result = await confirmBooking({
      bookingId,
      userId,
      amount,
      method,
    });

    // إرسال الرد للمستخدم بعد نجاح العملية
    res.status(201).json({
      message: 'Booking confirmed and payment created successfully.',
      data: result,
    });
  } catch (error) {
    // في حالة حدوث خطأ، نقوم بتمريره إلى الـ middleware التالي
    next(error);
  }
};
