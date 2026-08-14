import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const getUsers = async () => {
  return await User.find().select('-password');
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  return user;
};

export const updateUser = async (id, updateData) => {
  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  return { id };
};
