//venu.route.js
import express from "express";
import {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue
} from "../controllers/venue.controller.js";
import { venueValidationMiddleware } from "../middlewares/validateVenueMiddleware.js";
import { authMiddleware } from "../middlewares/auth.js"; // إضافة جديدة

const router = express.Router();
router.post('/venues', 
  authMiddleware,        // المصادقة
  venueValidationMiddleware, // التحقق من الصحة
  venueController.createVenue // الـ controller المحسن
);
//router.put('/venues/:id', venueValidationMiddleware, venueController.updateVenue);

// الطرق الأصلية محفوظة + نضيف الأمان
router.post("/", authMiddleware, venueValidationMiddleware, createVenue);//router.put("/:id", authMiddleware, venueValidationMiddleware, updateVenue);
router.delete("/:id", authMiddleware, deleteVenue);

// الطرق الجديدة للفلترة (إضافة اختيارية)
router.get("/filter", getAllVenues); // يمكن استخدامها للفلترة المتقدمة
router.put("/venues/:id", 
  middlewares, // المصادقة
  validateVenueMiddleware, // التحقق من الصحة
  updateVenue // الـ controller المحسن
);
// الطرق الأصلية تبقى كما هي
router.get("/", getAllVenues);
router.get("/:id", getVenueById);
//router.put('/venues/:id', venueValidationMiddleware, venueController.updateVenue);

export default router;