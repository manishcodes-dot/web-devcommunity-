import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const validateArticle = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Title and content are required'));
  }
  next();
};
