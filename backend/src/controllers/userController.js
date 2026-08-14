import asyncHandler from '../middleware/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import * as userService from '../services/userService.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  return new ApiResponse(HTTP_STATUS.OK, users, 'Users retrieved successfully').send(res);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return new ApiResponse(HTTP_STATUS.OK, user, 'User retrieved successfully').send(res);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return new ApiResponse(HTTP_STATUS.OK, user, 'User updated successfully').send(res);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  return new ApiResponse(HTTP_STATUS.OK, result, 'User deleted successfully').send(res);
});
