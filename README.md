# CREzER

A full-stack MERN application for managing borrowers, tracking transactions, and sharing expenses through group splits.

## Overview

Crezer MERN is built with a React frontend and a Node.js/Express backend. It supports user authentication, borrower management, transaction history, and expense sharing among groups.

## Features

- User registration, login, and logout
- Borrower creation and transaction tracking
- Split groups with member management
- Protected routes with JWT-based authentication
- Backend API served by Express and MongoDB
- Frontend built with React, Vite, Tailwind CSS, and Axios

## Repository Structure

- `frontend/` — React application using Vite and Tailwind CSS
- `backend/` — Express API server with MongoDB integration
- `backend/.env.example` — example environment variable file for backend setup

## Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file using the example template:

```bash
copy .env.example .env
```

4. Update `.env` with your configuration:

```env
MONGODB_URI="your-mongodb-connection-string"
JWT_SECRET_KEY="your-jwt-secret"
FRONTEND_ORIGIN="http://localhost:5173"
```

5. Start the backend server:

```bash
node app.js
```

The backend server listens on `PORT` or defaults to `3000`.

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create or update `.env` with the backend URL:

```env
VITE_BASE_URL='http://localhost:3000'
```

4. Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment Variables

### Backend

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET_KEY` — JWT signing secret
- `FRONTEND_ORIGIN` — allowed frontend origin for CORS

### Frontend

- `VITE_BASE_URL` — backend API base URL

## Running the Application

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend at `http://localhost:5173`.
4. Register or login, then use borrower and split group features.

## Useful Links

- `backend/README.md` — backend-specific documentation
- `frontend/README.md` — frontend-specific documentation

## Notes

- Keep both frontend and backend running for full functionality.
- Ensure the backend `FRONTEND_ORIGIN` matches the frontend origin exactly.
- Use HTTPS and secure cookie settings when deploying to production.

## License

This project is available for development and collaboration.
