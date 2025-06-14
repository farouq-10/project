//user.route.js
import express from "express";
import {
  signUp,
  handleLogin,
  handleOAuthLogin,
  handleOAuthCallback,
  resetPassword,
  changePassword,
  resendActivationLink,
  deactivateUser,
  updateProfilePicture,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  
} from "../controllers/user.controller.js";

import { loginRateLimiter } from "../middlewares/rateLimiter.js";
import validate from "../middlewares/validate.js";

import { loginSchema, signupSchema} from "../validators/user.validators.js";

import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post("/signup", validate(signupSchema), signUp);
//router.post("/login", validate(loginSchema), handleLogin);
router.post("/login", loginRateLimiter, validate(loginSchema), handleLogin);

// تسجيل دخول عبر OAuth
router.get("/auth/:provider", handleOAuthLogin);

// كول باك من OAuth
router.get("/auth/callback", handleOAuthCallback);
// Add POST endpoint for client-side callback
router.post("/auth/callback", handleOAuthCallback);

// إرسال رابط استرجاع كلمة السر
router.post("/reset-password", resetPassword);

// تغيير كلمة المرور (يتطلب توكن مصادقة)
router.post("/change-password", authMiddleware, changePassword);

// إعادة إرسال رابط التفعيل
router.post("/resend-activation", resendActivationLink);

// تعطيل حساب
router.patch("/deactivate", authMiddleware, deactivateUser);

// تحديث صورة البروفايل
router.patch("/profile-picture", authMiddleware, updateProfilePicture);

// الحصول على بيانات المستخدم
router.get("/me", authMiddleware, getUserProfile);

// تحديث بيانات المستخدم
router.put("/me", authMiddleware, updateUserProfile);

// حذف المستخدم
router.delete("/me", authMiddleware, deleteUser);

export default router;
