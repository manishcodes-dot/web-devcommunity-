import Comment from '../models/Comment.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const getArticleComments = async (articleId) => {
  return await Comment.find({ article: articleId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
};

export const createComment = async (articleId, userId, content) => {
  const comment = await Comment.create({
    article: articleId,
    user: userId,
    content,
  });
  return await comment.populate('user', 'name avatar');
};

export const deleteComment = async (commentId, user) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Comment not found');
  }

  if (comment.user.toString() !== user._id.toString() && user.role !== 'admin') {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Not authorized to delete this comment');
  }

  await comment.deleteOne();
  return { id: commentId };
};
