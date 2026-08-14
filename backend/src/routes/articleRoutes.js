import express from 'express';
import {
  getArticles,
  getArticleByIdOrSlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import { getArticleComments, createComment } from '../controllers/commentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateArticle } from '../validators/articleValidator.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router
  .route('/')
  .get(getArticles)
  .post(protect, authorize(ROLES.EDITOR, ROLES.ADMIN), validateArticle, createArticle);

router
  .route('/:id')
  .get(getArticleByIdOrSlug)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

// Nested comment routes
router
  .route('/:articleId/comments')
  .get(getArticleComments)
  .post(protect, createComment);

export default router;
