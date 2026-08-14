import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Please provide name, email, and password'));
  }
  if (password.length < 6) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Password must be at least 6 characters'));
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Please provide email and password'));
  }
  next();
};
