import express from 'express';
import authRoutes from './authRoutes.js';
import articleRoutes from './articleRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import commentRoutes from './commentRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

export default router;
