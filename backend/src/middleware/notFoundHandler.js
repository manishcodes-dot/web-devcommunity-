import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

const notFoundHandler = (req, res, next) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route not found - ${req.originalUrl}`));
};

export default notFoundHandler;
