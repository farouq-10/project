//guide.routes.js
import express from "express";
import {
  getAllGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
  getGuideCategories,
  createGuideCategory,
  updateGuideCategory,
  deleteGuideCategory
} from "../controllers/guide.controller.js";

import { authMiddleware } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { guideSchema, guideCategorySchema } from '../validators/guide.validators.js';

const router = express.Router();

// Public routes - no authentication required
router.get("/", getAllGuides);
router.get("/categories", getGuideCategories);
router.get("/:guideId", getGuideById);

// Protected routes - require authentication and admin privileges
router.post("/", authMiddleware, validate(guideSchema), createGuide);
router.put("/:guideId", authMiddleware, validate(guideSchema), updateGuide);
router.delete("/:guideId", authMiddleware, deleteGuide);

// Category management routes - require authentication and admin privileges
router.post("/categories", authMiddleware, validate(guideCategorySchema), createGuideCategory);
router.put("/categories/:categoryId", authMiddleware, validate(guideCategorySchema), updateGuideCategory);
router.delete("/categories/:categoryId", authMiddleware, deleteGuideCategory);

export default router;