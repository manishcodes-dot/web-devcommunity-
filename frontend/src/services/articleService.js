import axiosClient from '../api/axiosClient';

export const fetchArticlesApi = async (params = {}) => {
  return await axiosClient.get('/articles', { params });
};

export const fetchArticleByIdApi = async (id) => {
  return await axiosClient.get(`/articles/${id}`);
};

export const createArticleApi = async (articleData) => {
  return await axiosClient.post('/articles', articleData);
};

export const deleteArticleApi = async (id) => {
  return await axiosClient.delete(`/articles/${id}`);
};

export const toggleArticleLikeApi = async (id) => {
  return await axiosClient.post(`/articles/${id}/like`);
};
