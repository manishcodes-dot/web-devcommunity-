import Article from '../models/Article.js';
import Comment from '../models/Comment.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const getArticles = async (query, user = null) => {
  const { page = 1, limit = 10, category, search, featured, myNotes } = query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (featured !== undefined) {
    filter.isFeatured = featured === 'true';
  }

  // Handle Public vs Private visibility based on authenticated user context
  if (myNotes === 'true' && user) {
    filter.author = user._id;
  } else if (user) {
    // Show all public articles PLUS private articles owned by current user
    filter.$or = [
      { isPrivate: { $ne: true } },
      { author: user._id }
    ];
  } else {
    // Unauthenticated: show only public articles
    filter.isPrivate = { $ne: true };
  }

  if (search) {
    const searchFilter = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
    ];
    if (filter.$or) {
      filter.$and = [
        { $or: filter.$or },
        { $or: searchFilter }
      ];
      delete filter.$or;
    } else {
      filter.$or = searchFilter;
    }
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate('author', 'name email avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Article.countDocuments(filter),
  ]);

  const articleIds = articles.map((a) => a._id);
  const commentCounts = await Comment.aggregate([
    { $match: { article: { $in: articleIds } } },
    { $group: { _id: '$article', count: { $sum: 1 } } },
  ]);
  const commentCountMap = {};
  commentCounts.forEach((c) => {
    commentCountMap[c._id.toString()] = c.count;
  });

  const formattedArticles = articles.map((art) => {
    const doc = art.toObject ? art.toObject() : art;
    const likes = doc.likes || [];
    const isLiked = Boolean(
      user && likes.some((id) => id.toString() === user._id.toString())
    );
    return {
      ...doc,
      likesCount: likes.length,
      isLiked,
      commentsCount: commentCountMap[doc._id.toString()] || 0,
    };
  });

  return {
    articles: formattedArticles,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getArticleByIdOrSlug = async (identifier, user = null) => {
  let article;
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    article = await Article.findById(identifier)
      .populate('author', 'name email avatar bio')
      .populate('category', 'name slug');
  } else {
    article = await Article.findOne({ slug: identifier })
      .populate('author', 'name email avatar bio')
      .populate('category', 'name slug');
  }

  if (!article) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Article not found');
  }

  // Privacy protection check
  if (article.isPrivate) {
    const authorIdStr = article.author?._id
      ? article.author._id.toString()
      : article.author?.toString();
    const userIdStr = user?._id
      ? user._id.toString()
      : user?.id?.toString() || user?.toString();
    if (!user || (authorIdStr !== userIdStr && user.role !== 'admin')) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        'You are not authorized to view this private note'
      );
    }
  }

  // Increment views count
  article.viewsCount += 1;
  await article.save();

  const commentsCount = await Comment.countDocuments({ article: article._id });

  const doc = article.toObject();
  const likes = doc.likes || [];
  const isLiked = Boolean(
    user && likes.some((id) => id.toString() === user._id.toString())
  );

  return {
    ...doc,
    likesCount: likes.length,
    isLiked,
    commentsCount,
  };
};

export const toggleLikeArticle = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Article not found');
  }

  if (!article.likes) {
    article.likes = [];
  }

  const userIdStr = userId.toString();
  const existingIndex = article.likes.findIndex((id) => id.toString() === userIdStr);

  let isLiked = false;
  if (existingIndex > -1) {
    article.likes.splice(existingIndex, 1);
    isLiked = false;
  } else {
    article.likes.push(userId);
    isLiked = true;
  }

  await article.save();

  return {
    id: article._id,
    isLiked,
    likesCount: article.likes.length,
  };
};

export const createArticle = async (articleData, authorId) => {
  const summary =
    articleData.summary ||
    (articleData.content ? articleData.content.substring(0, 150) : '');

  const payload = {
    ...articleData,
    summary,
    author: authorId,
    isPrivate: Boolean(articleData.isPrivate),
  };

  if (!payload.category || (typeof payload.category === 'string' && payload.category.trim() === '')) {
    delete payload.category;
  }

  const article = await Article.create(payload);
  return await article.populate([
    { path: 'author', select: 'name email avatar' },
    { path: 'category', select: 'name slug' },
  ]);
};

export const updateArticle = async (id, updateData, user) => {
  const article = await Article.findById(id);

  if (!article) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Article not found');
  }

  const authorIdStr = article.author?._id ? article.author._id.toString() : article.author?.toString();
  const userIdStr = user?._id ? user._id.toString() : user?.toString();

  if (authorIdStr !== userIdStr && user?.role !== 'admin') {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Not authorized to update this article');
  }

  Object.assign(article, updateData);
  await article.save();

  return await article.populate([
    { path: 'author', select: 'name email avatar' },
    { path: 'category', select: 'name slug' },
  ]);
};

export const deleteArticle = async (id, user) => {
  const article = await Article.findById(id);

  if (!article) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Article not found');
  }

  const authorIdStr = article.author?._id ? article.author._id.toString() : article.author?.toString();
  const userIdStr = user?._id ? user._id.toString() : user?.toString();

  if (authorIdStr !== userIdStr && user?.role !== 'admin') {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Not authorized to delete this article');
  }

  await article.deleteOne();
  return { id };
};
