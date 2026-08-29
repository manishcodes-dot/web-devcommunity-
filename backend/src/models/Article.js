import mongoose from 'mongoose';
import { ARTICLE_STATUS } from '../constants/roles.js';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    summary: {
      type: String,
      required: [true, 'Article summary is required'],
      maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Article content is required'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: Object.values(ARTICLE_STATUS),
      default: ARTICLE_STATUS.PUBLISHED,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    readTimeMinutes: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.pre('save', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.slug =
      this.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + '-' + randomSuffix;
  }
  next();
});

const Article = mongoose.model('Article', articleSchema);
export default Article;
