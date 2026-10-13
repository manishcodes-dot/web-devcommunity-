import axiosClient from '../api/axiosClient';

export const fetchArticleCommentsApi = async (articleId) => {
  return await axiosClient.get(`/articles/${articleId}/comments`);
};

export const createCommentApi = async (articleId, content) => {
  return await axiosClient.post(`/articles/${articleId}/comments`, { content });
};

export const deleteCommentApi = async (commentId) => {
  return await axiosClient.delete(`/comments/${commentId}`);
};
