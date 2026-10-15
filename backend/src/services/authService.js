import jwt from 'jsonwebtoken';
import avatar from 'craft-avatar';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const registerUser = async ({ name, email, password, role, avatar: customAvatar }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'User with this email already exists');
  }

  let finalAvatar = customAvatar;
  if (!finalAvatar) {
    try {
      finalAvatar = avatar({ seed: name || email, shape: 'circle' }).dataUri;
    } catch {
      finalAvatar = '';
    }
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user',
    avatar: finalAvatar,
  });

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  // If user has old placeholder or empty avatar, provide a deterministic craft-avatar
  let userAvatar = user.avatar;
  if (!userAvatar || userAvatar.includes('unsplash.com/photo-1534528741775-53994a69daeb')) {
    try {
      userAvatar = avatar({ seed: user.name || user.email, shape: 'circle' }).dataUri;
    } catch {
      // keep existing
    }
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: userAvatar,
    },
    token,
  };
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  return user;
};
