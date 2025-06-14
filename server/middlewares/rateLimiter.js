//rate limiter..js
import rateLimit from "express-rate-limit";

// Rate Limiter مخصص للـ login route
export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 دقيقة
  max: 5,              // أقصى عدد محاولات: 5 محاولات في الدقيقة
  message: {
    success: false,
    message: "Too many login attempts, please try again after a minute."
  },
  standardHeaders: true, // بيرجع RateLimit headers (مفيد للـ frontend)
  legacyHeaders: false,
});
