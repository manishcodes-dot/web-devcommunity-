import asyncHandler from '../middleware/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import * as commentService from '../services/commentService.js';

export const getArticleComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getArticleComments(req.params.articleId);
  return new ApiResponse(HTTP_STATUS.OK, comments, 'Comments retrieved successfully').send(res);
});

export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(
    req.params.articleId,
    req.user._id,
    req.body.content
  );
  return new ApiResponse(HTTP_STATUS.CREATED, comment, 'Comment posted successfully').send(res);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const result = await commentService.deleteComment(req.params.id, req.user);
  return new ApiResponse(HTTP_STATUS.OK, result, 'Comment deleted successfully').send(res);
});
