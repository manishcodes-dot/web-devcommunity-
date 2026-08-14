import asyncHandler from '../middleware/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import * as categoryService from '../services/categoryService.js';

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  return new ApiResponse(HTTP_STATUS.OK, categories, 'Categories retrieved successfully').send(res);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return new ApiResponse(HTTP_STATUS.CREATED, category, 'Category created successfully').send(res);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  return new ApiResponse(HTTP_STATUS.OK, category, 'Category updated successfully').send(res);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);
  return new ApiResponse(HTTP_STATUS.OK, result, 'Category deleted successfully').send(res);
});
