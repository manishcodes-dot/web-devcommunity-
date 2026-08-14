import Category from '../models/Category.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const getCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

export const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Category already exists');
  }
  return await Category.create(data);
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!category) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Category not found');
  }
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Category not found');
  }
  return { id };
};
