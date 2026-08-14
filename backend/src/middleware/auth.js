import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized, token missing'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User no longer exists'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized, invalid token'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(HTTP_STATUS.FORBIDDEN, `User role '${req.user?.role}' is not authorized for this resource`)
      );
    }
    next();
  };
};
