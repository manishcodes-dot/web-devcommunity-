import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const validateArticle = (req, res, next) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Title, content, and category are required'));
  }
  next();
};
