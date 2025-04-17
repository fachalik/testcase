# AssistX Test Case

This repository contains a full-stack application built with React, Vite, TypeScript, NestJS, and Prisma. The project is divided into two main parts:

Frontend: A React-based application using Vite for development and Ant Design for UI components.
Backend: A NestJS-based API server using Prisma for database management.

## 🖼️ Screenshot

### endpoint

![endpoint](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/endpoint.png)

### Sign In

![signin](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/signin.png)

### Register

![register](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/register.png)

### Dashboard

![dashboard](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/dashboard.png)

### List Barang

![list-barang](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/listbarang.png)

### Create Barang

![create-barang](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/createbarang.png)

### Update Barang

![update-barang](https://raw.githubusercontent.com/fachalik/testcase/c8c5fff63b01e19cde14daa9b6a0d13587e3feca/image/updatebarang.png)

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [License](#license)

## Project Structure

assistx-test-case/
├── backend/ # Backend application (NestJS + Prisma)
├── frontend/ # Frontend application (React + Vite)
└── readme.md # Project documentation

## Technologies Used

## Frontend

- **React**: Library for building user interfaces.
- **Vite**: Fast development build tool.
- **TypeScript**: Strongly typed JavaScript.
- **Ant Design**: UI component library.
- **Zustand**: State management.
- **React Query**: Data fetching and caching.
- **Zod**: Schema validation.

## Backend

- **NestJS**: Progressive Node.js framework.
- **Prisma**: ORM for database management.
- **MySQL**: Database.
- **JWT**: Authentication.
- **Helmet**: Security middleware.
- **Swagger**: API documentation.

<!-- List the main features of the project. -->

## Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies
   ```sh
   yarn install
   ```
3. Configure the environment variables: Create a .env file in the backend folder and add the following:
   ```sh
   DATABASE_URL="mysql://root:@127.0.0.1:3306/assistx-test"
   PORT=3000
   JWT_SECRET="assistx-testcase"
   ```
4. Run Prisma migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```sh
   yarn start:dev
   ```
6. The backend server will run at http://localhost:3000.

### Frontend Setup

1. Navigate to the frontend folder
   ```sh
   cd frontend
   ```
2. Install dependencies
   ```sh
   yarn install
   ```
3. Configure the environment variables: Create a .env file in the frontend folder and add the following:
   ```sh
   VITE_APP_APP_API_URL=http://localhost:3000/api
   ```
4. Start the frontend development server:
   ```sh
   yarn dev
   ```
5. The frontend application will run at http://localhost:5173

## Usage

1. Register: Create a new user account.
2. Login: Authenticate with your email and password.
3. Dashboard: View statistics and insights.
4. Barang Management:

- Create, update, delete, and view items (Barang).
- Paginated list of items.

5. Authentication: JWT-based authentication for secure API access.

## API Documentation

The backend API is documented using Swagger. After starting the backend server, you can access the API documentation at:

```sh
http://localhost:3000/api/docs
```

## Features

### Frontend

- Authentication: Login and registration with form validation.
- Dashboard: Displays user and item statistics.
- CRUD Operations: Create, read, update, and delete items.
- Pagination: Paginated list of items.
- State Management: Zustand for global state.
- UI Components: Ant Design for a polished user interface.

### Backend

- Authentication: JWT-based authentication.
- Database: Prisma ORM with MySQL.
- Validation: DTOs with class-validator.
- Error Handling: Custom exception filters.
- Swagger: API documentation.
- Security: Helmet for enhanced security.

## Folder Structure

### Backend

```sh
backend/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── api/v1/             # API modules (auth, barang, user)
│   ├── common/             # Common utilities (guards, interceptors)
│   ├── filters/            # Global exception filters
│   ├── interceptors/       # Global response interceptors
│   ├── prisma/             # Prisma service
│   └── main.ts             # Application entry point
├── test/                   # E2E tests
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── [README.md](http://_vscodecontentref_/2)               # Backend documentation
```

### Frontend

```sh
frontend/
├── src/
│   ├── App/                # Application routes and layout
│   ├── components/         # Reusable UI components
│   ├── modules/            # Feature modules (Auth, Dashboard, Barang)
│   ├── service/            # API service layer
│   ├── store/              # Zustand state management
│   ├── utils/              # Utility functions
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── [README.md](http://_vscodecontentref_/3)               # Frontend documentation
```

### License

This project is licensed under the MIT License.
