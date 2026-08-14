import axiosClient from '../api/axiosClient';

export const loginApi = async (credentials) => {
  return await axiosClient.post('/auth/login', credentials);
};

export const registerApi = async (userData) => {
  return await axiosClient.post('/auth/register', userData);
};

export const getCurrentUserApi = async () => {
  return await axiosClient.get('/auth/me');
};
