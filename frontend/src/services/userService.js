import axiosClient from '../api/axiosClient';

export const updateUserProfileApi = async (userId, updateData) => {
  return await axiosClient.put(`/users/${userId}`, updateData);
};

export const getUserByIdApi = async (userId) => {
  return await axiosClient.get(`/users/${userId}`);
};
