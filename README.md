# Coder Square

A social platform for developers to share, discover, and discuss coding resources and posts.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [Core Files](#core-files)
  - [Controllers](#controllers)
  - [Data Store](#data-store)
  - [Middleware](#middleware)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Protected Endpoints](#protected-endpoints)
- [Database Schema](#database-schema)
  - [Users Table](#users-table)
  - [Posts Table](#posts-table)
  - [Planned Tables](#planned-tables)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Types and Interfaces](#types-and-interfaces)

---

## Overview

Coder Square is a TypeScript-based Express.js server application designed for developers to create accounts, share coding resources and posts, and engage with the community through likes and comments.

## Features

- **User Authentication**: Sign up and login with JWT-based authentication
- **Post Management**: Create and browse posts with titles and URLs
- **Extensible Architecture**: Designed with a data access layer that supports multiple storage backends
- **Type Safety**: Full TypeScript implementation with strong typing throughout
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: HTTP request logging for debugging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Language**: TypeScript v5.9.3
- **Database**: SQLite3 v5.1.7
- **Authentication**: JSON Web Tokens (JWT)
- **Development Tools**: 
  - Nodemon for hot reloading
  - PM2 for production process management
  - Prettier for code formatting

## Project Structure

```
coder-square/
├── README.md                          # This file
├── server/                            # Server application root
│   ├── server.ts                      # Entry point and Express setup
│   ├── types.ts                       # Core type definitions
│   ├── ApiTypes.ts                    # API request/response types
│   ├── auth.ts                        # JWT authentication logic
│   ├── package.json                   # Project dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── controllers/                   # Route handlers
│   │   ├── PostController.ts          # Post-related endpoints
│   │   └── userController.ts          # User authentication endpoints
│   ├── middleware/                    # Express middleware
│   │   ├── authMiddleware.ts          # JWT verification
│   │   ├── errorHandlerMiddleware.ts  # Global error handling
│   │   └── loggerMiddleware.ts        # Request logging
│   └── DataStore/                     # Data access layer
│       ├── index.ts                   # DataStore initialization
│       ├── DAW/                       # Data Access Objects
│       │   ├── UserDao.ts             # User operations
│       │   ├── PostDao.ts             # Post operations
│       │   ├── CommentDao.ts          # Comment operations
│       │   └── LikeDao.ts             # Like operations
│       ├── MemoryDB/                  # In-memory storage (planned)
│       │   └── index.ts
│       └── SQL/                       # SQLite implementation
│           ├── index.ts               # SQL DataStore class
│           └── migrations/
│               └── 001-initial.sql    # Initial database schema
```

### Core Files

- **server.ts**: Main Express application setup with route definitions
- **types.ts**: Core interfaces (User, Post, Comment, Like) and custom ExpressHandler type
- **ApiTypes.ts**: Type definitions for API request/response objects

### Controllers

- **PostController.ts**: Handles POST /create and GET /posts endpoints
- **userController.ts**: Handles POST /signup and POST /login endpoints

### Data Store

Abstracted data persistence layer with multiple implementation options:
- **DAW (Data Access Objects)**: Interface definitions for CRUD operations
- **SQL**: SQLite3-based implementation (currently active)
- **MemoryDB**: In-memory storage (extensible for testing)

### Middleware

- **authMiddleware.ts**: Validates JWT tokens on protected routes
- **errorHandlerMiddleware.ts**: Centralized error response handling
- **loggerMiddleware.ts**: Logs incoming HTTP requests

## API Endpoints

### Authentication Endpoints

#### Sign Up
- **Method**: POST
- **Path**: `/signup`
- **Authentication**: None (public)
- **Request Body**:
  ```typescript
  {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
  }
  ```
- **Response**: JWT token (201 Created)

#### Login
- **Method**: POST
- **Path**: `/login`
- **Authentication**: None (public)
- **Request Body**:
  ```typescript
  {
    login: string;        // username or email
    password: string;
  }
  ```
- **Response**: User object and JWT token (200 OK)

### Protected Endpoints

All endpoints below require valid JWT in Authorization header.

#### List Posts
- **Method**: GET
- **Path**: `/posts`
- **Response**: Array of all posts (200 OK)

#### Create Post
- **Method**: POST
- **Path**: `/create`
- **Request Body**:
  ```typescript
  {
    title: string;
    url: string;
  }
  ```
- **Response**: Created post object (201 Created)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id        VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName  VARCHAR NOT NULL,
    userName  VARCHAR UNIQUE NOT NULL,
    email     VARCHAR UNIQUE NOT NULL,
    password  VARCHAR NOT NULL
);
```

### Posts Table
```sql
CREATE TABLE posts (
    id       VARCHAR PRIMARY KEY,
    title    VARCHAR NOT NULL,
    url      VARCHAR UNIQUE NOT NULL,
    userId   VARCHAR NOT NULL,
    postedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);
```

### Planned Tables

- **comments**: For post discussions (structure defined in types.ts)
- **likes**: For post likes (structure defined in types.ts)

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AhmedAyman77/coder-square.git
   cd coder-square
   ```

2. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `server/` directory:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Build TypeScript**:
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode
Watch for file changes and automatically restart the server:
```bash
npm run dev
```

### Production Mode
Build and run with PM2 process manager:
```bash
npm run start:prod
```

### Custom Port
```bash
PORT=5000 npm run dev
```

## Development

- **TypeScript Compilation**: Configuration in `tsconfig.json`
- **Code Formatting**: Configured with Prettier
- **Hot Reload**: Enabled with Nodemon in dev mode

## Types and Interfaces

### User
```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}
```

### Post
```typescript
interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
}
```

### Comment
```typescript
interface Comment {
  id: string;
  userId: string;
  postId: string;
  Comment: string;
  postedAt: number;
}
```

### Like
```typescript
interface Like {
  userId: string;
  postId: string;
}
```

### ExpressHandler
Custom generic handler type for type-safe Express route handlers with proper typing for request and response bodies.

---

**Repository**: [AhmedAyman77/coder-square](https://github.com/AhmedAyman77/coder-square)
