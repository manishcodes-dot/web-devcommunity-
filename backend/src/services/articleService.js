import Article from '../models/Article.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/statusCodes.js';

export const getArticles = async (query) => {
  const { page = 1, limit = 10, category, search, featured } = query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (featured !== undefined) {
    filter.isFeatured = featured === 'true';
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
    ];
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

  return {
    articles,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getArticleByIdOrSlug = async (identifier) => {
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

  // Increment views count
  article.viewsCount += 1;
  await article.save();

  return article;
};

export const createArticle = async (articleData, authorId) => {
  const article = await Article.create({
    ...articleData,
    author: authorId,
  });
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

  if (article.author.toString() !== user._id.toString() && user.role !== 'admin') {
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

  if (article.author.toString() !== user._id.toString() && user.role !== 'admin') {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Not authorized to delete this article');
  }

  await article.deleteOne();
  return { id };
};
