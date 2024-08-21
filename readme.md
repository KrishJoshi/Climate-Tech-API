# Climate Tech API

This API was developed with a modular architecture, allowing for easy extension and scalability by adding additional routes in the `/api/` directory. Prisma is used as the ORM, providing a type-safe connection to the database, ensuring data integrity and ease of development.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Running the Application](#running-the-application)
    - [Development](#development)
    - [Production](#production)
- [Testing](#testing)
- [Linting](#linting)
- [Future Considerations](#future-considerations)

## Features

- **Modular Design**: Easily extendable structure for adding new routes and features.
- **Centralised Error Handling**: Unified error management with custom middleware.
- **Comprehensive Testing**: Unit and integration tests implemented using Jest and Supertest.
- **TypeScript**: Leverages TypeScript for enhanced type safety and developer experience.
- **Code Quality**: Enforced with TSLint to maintain consistent and high-quality code standards.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: v21.x or higher
- **npm**: v10.x or higher

### Installation

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Variables**:  
   For demonstration purposes, the `.env` file is included with a link to a SQLite database. In a production environment, sensitive files like `.env` would be included in `.gitignore` to protect environment-specific settings.

## Running the Application

### Development

To run the application in development mode:

```bash
npm run dev
```

### Production

Production setup is not yet implemented. To properly deploy in production, I would configure environment variables in `.env.production` and use `npx prisma migrate deploy` to apply database migrations in a CI/CD pipeline.

## Testing

This project includes comprehensive testing using Jest and Supertest. It covers both unit tests for individual services and integration tests for API endpoints.

**Run Tests**:

```bash
npm test
```

## Linting

Code quality is maintained using TSLint, which ensures that the codebase remains consistent and adheres to best practices.

**Run Linting**:

```bash
npm run lint
```

**Auto-fix Linting Issues**:

```bash
npm run lint -- --fix
```

## Future Considerations

### Pagination
To efficiently handle large datasets and improve the performance of data retrieval, pagination can be introduced. Prisma’s built-in pagination features can be used to limit the number of results returned in a single query. This allows clients to request data in manageable chunks rather than receiving potentially overwhelming amounts of information all at once.

**Example**: Implementing pagination using `take` and `skip` parameters in Prisma queries to return a specific number of records per page.

### API Token Security
There are multiple approaches to implementing API token security:

- **Single API Token**: A simple approach is to use a single API token specified in the `.env` file. This provides a basic level of security and is easy to implement, but it may not be sufficient for a production environment where more granular control and scalability are required.
- **Users and API Tokens Table**: A more robust solution involves creating a `users` and `api_tokens` table in the database. Each user would have a unique API token, allowing for more granular access control. This setup also enables features such as token expiration, token revocation, and user-specific permissions, making the API more secure and easier to manage in a production environment.

Then implement a middleware that verifies the API token with each request. This middleware can check the token against the database or compare it with a single token from the environment configuration.
