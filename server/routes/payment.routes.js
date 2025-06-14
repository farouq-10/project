// في ملف payment.routes.js
import express from 'express';
import { handleCreatePayment } from '../controllers/payment.controller.js';  // استيراد الدالة الخاصة بالدفع
import { createPaymentSchema } from '../validators/payment.validators.js';  // استيراد الـ Schema الخاص بالفالديشن
import  validate  from '../middlewares/validate.js';  // استيراد Middleware الفالديشن

const router = express.Router();

// تعريف route للدفع مع الفالديشن
router.post('/confirm', validate(createPaymentSchema), handleCreatePayment);

export default router;
