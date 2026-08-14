import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.use(protect);

router.get('/', authorize(ROLES.ADMIN), getUsers);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(authorize(ROLES.ADMIN), deleteUser);

export default router;
