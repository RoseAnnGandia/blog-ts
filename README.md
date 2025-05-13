# Blog API Project
A scalable, modular RESTful API for a blog platform built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB Atlas**. This API supports user authentication, post management, and user profile management.

## Table of Contents
- [Blog API Project](#blog-api-project)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
  - [Future Improvements](#future-improvements)
  - [Contributing](#contributing)

---

## Project Structure
```
blog                                              # Root directory for the project
├── bruno                                         # Testing environment directory for Bruno API
│   ├── environments                              # Configuration files for specific test environments
│   │   └── local.bru                             # Local testing environment configuration for Bruno API
│   └── v1                                        # Version 1 of the API (Test environment)
│       ├── auth                                  # Authentication-related test files
│       │   ├── signin.bru                        # Test for sign-in functionality
│       │   └── ...                               # Other authentication files
│       ├── posts                                 # Test files for post-related routes
│       └── users                                 # Test files for user-related routes
│   └── bruno.json                                # Main configuration file for the Bruno environment
├── src                                           # Source code directory
│   ├── api                                       # Contains versioned API routes
│   │   └── v1                                    # API version 1
│   │       ├── auth                              # Auth-related controllers, models, routes, etc.
│   │       │   ├── auth.controller.ts            # Controller for auth actions
│   │       │   ├── auth.model.ts                 # Mongoose model for auth
│   │       │   ├── auth.routes.ts                # Routes related to authentication
│   │       │   ├── auth.service.ts               # Auth logic and services
│   │       │   └── auth.types.ts                 # TypeScript types for auth
│   │       ├── posts                             # Post-related files (controllers, models, routes, etc.)
│   │       └── users                             # User-related files (controllers, models, routes, etc.)
│   ├── config                                    # Configuration files (e.g., database)
│   │   └── db.ts                                 # Database connection and configuration
│   ├── middlewares                               # Middleware functions
│   │   ├── authentication.middleware.ts          # Authentication middleware
│   │   └── error-handler.middleware.ts           # Global error handling middleware
│   ├── utils                                     # Utility functions and validators
│   │   ├── validators                            # Validation files
│   │   │   ├── auth-headers-validator.ts         # Validate auth headers
│   │   │   ├── device-headers.validator.ts       # Validate device headers
│   │   │   └── zod-schema.validator.ts           # Zod schema validation
│   │   ├── custom-error.ts                       # Custom error handling class
│   │   └── zod-error-handler.ts                  # Handle Zod validation errors
│   ├── app.ts                                    # Main Express app file where middlewares and routes are defined
│   └── index.ts                                  # Entry point of the application
├── .env                                          # Environment variables (API keys, DB URIs, etc.)
├── .gitignore                                    # Git ignore file to exclude node_modules, build, etc.
├── jest.config.ts                                # Jest configuration file
├── package-lock.json                             # Lock file for npm dependencies
├── package.json                                  # Project metadata and dependencies
├── tsconfig.json                                 # TypeScript configuration
└── tsconfig.paths.json                           # TypeScript path aliases configuration
```
##### [Back to Top](#table-of-contents)
---


## Features:
- **Authentication & Authorization:**
  - User registration and login using JWT (Access & Refresh Tokens).
  - Secure password hashing with bcrypt.
  
- **User Management:**
  - Create, update, delete, and view user profiles.

- **Post Management:**
  - Create, update, delete, and view posts.
  - Authorization ensures only authors can modify or delete their posts.
  
- **Error Handling:**
  - Centralized error handling with custom error classes.
  - Zod validation for request payloads.

- **Security:**
  - Environment variables for sensitive configurations.
  - Secure token storage with TTL indexes in MongoDB.

##### [Back to Top](#table-of-contents)
---

## Getting Started:
- **Prerequisites**
  - Node.js installed
  - MongoDB Atlas account

- **Installation**
```bash
  git clone https://github.com/RoseAnnGandia/blog-api.git
  cd blog-api
  npm install
```

- **Configure Environment Variables:**
  - Create an .env file.
  - Fill in the required values:
```
  NODE_ENV=development
  PORT=3000
  MONGODB_URI='mongo_uri_from_mongodb_atlas'
  ACCESS_TOKEN_SECRET=your_access_token
  REFRESH_TOKEN_SECRET=your_secret_token
```

##### [Back to Top](#table-of-contents)
---

## Available Scripts
The following scripts are available for various tasks:

- **Development:**
  - **start:**
  Starts the app in development mode using tsx, watching for file changes and automatically recompiling when changes occur. The environment variables are loaded from .env.
```
bash
npm run start
```

- **Testing:**
```
bash
npm run test       # Run the Jest test suite
npm run testmain   # Run the Jest test suite in order
npm run test:clear # Clear Jest's cache
```

##### [Back to Top](#table-of-contents)
---

## Future Improvements
- Expand test coverage and optimize test execution.
- Implement role-based access control (RBAC).
- Enhance API documentation using Swagger.

---

## Contributing
Contributions are welcome! Please follow the code style and make pull requests for any improvements.

##### [Back to Top](#table-of-contents)