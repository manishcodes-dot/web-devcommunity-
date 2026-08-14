# News Portal Backend API

Production-ready Node.js, Express, and Mongoose (MongoDB) backend architecture.

## Architecture

```
Client -> Express Server -> Router -> Controller -> Service -> Model (Mongoose) -> MongoDB
```

## Features

- Layered architecture following Single Responsibility Principle
- Authentication with JWT and bcrypt password hashing
- Role-based authorization (`user`, `editor`, `admin`)
- Mongoose schemas with validation, indexing, and timestamps
- Standardized API Response format (`{ success, message, data }`)
- Reusable middleware: Helmet, CORS, Morgan, Error Handler, Async Handler, Auth & Authorization
- RESTful routes for Auth, Articles, Categories, Comments, Users

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/news-portal
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Run in production mode:
   ```bash
   npm start
   ```
