import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Logging Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes V1
app.use('/api/v1', routes);

// 404 Not Found Fallback
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
