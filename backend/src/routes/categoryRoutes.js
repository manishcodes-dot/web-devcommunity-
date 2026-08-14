import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize(ROLES.ADMIN), createCategory);

router
  .route('/:id')
  .put(protect, authorize(ROLES.ADMIN), updateCategory)
  .delete(protect, authorize(ROLES.ADMIN), deleteCategory);

export default router;
