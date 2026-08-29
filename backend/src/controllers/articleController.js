import asyncHandler from '../middleware/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import * as articleService from '../services/articleService.js';

export const getArticles = asyncHandler(async (req, res) => {
  const result = await articleService.getArticles(req.query, req.user);
  return new ApiResponse(HTTP_STATUS.OK, result, 'Articles retrieved successfully').send(res);
});

export const getArticleByIdOrSlug = asyncHandler(async (req, res) => {
  const article = await articleService.getArticleByIdOrSlug(req.params.id);
  return new ApiResponse(HTTP_STATUS.OK, article, 'Article retrieved successfully').send(res);
});

export const createArticle = asyncHandler(async (req, res) => {
  const article = await articleService.createArticle(req.body, req.user._id);
  return new ApiResponse(HTTP_STATUS.CREATED, article, 'Article created successfully').send(res);
});

export const updateArticle = asyncHandler(async (req, res) => {
  const article = await articleService.updateArticle(req.params.id, req.body, req.user);
  return new ApiResponse(HTTP_STATUS.OK, article, 'Article updated successfully').send(res);
});

export const deleteArticle = asyncHandler(async (req, res) => {
  const result = await articleService.deleteArticle(req.params.id, req.user);
  return new ApiResponse(HTTP_STATUS.OK, result, 'Article deleted successfully').send(res);
});
