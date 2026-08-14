import asyncHandler from '../middleware/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import * as authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return new ApiResponse(HTTP_STATUS.CREATED, result, 'User registered successfully').send(res);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  return new ApiResponse(HTTP_STATUS.OK, result, 'Login successful').send(res);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);
  return new ApiResponse(HTTP_STATUS.OK, user, 'Profile fetched successfully').send(res);
});
