# Crezer Backend

A Node.js / Express backend for the Crezer application. This backend handles user authentication, borrower management, transaction tracking, and split group workflows.

## Environment Variables

The backend requires the following environment variables:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET_KEY` — secret key for signing JSON Web Tokens
- `FRONTEND_ORIGIN` — allowed frontend origin for CORS

Example `.env`:

```env
MONGODB_URI="your-mongodb-connection-string"
JWT_SECRET_KEY="your-jwt-secret"
FRONTEND_ORIGIN="http://localhost:5173"
```

## Tech Stack

- Node.js
- Express
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- bcrypt
- dotenv
- cors
- cookie-parser

## Project Structure

- `app.js` — application entry point and middleware setup
- `configuration/config.js` — loads and validates environment variables
- `configuration/db.js` — MongoDB connection helper
- `routes/` — API route definitions
- `controllers/` — request handlers and business logic
- `models/` — Mongoose schemas
- `middlewares/` — route protection and request middleware

## Setup and Installation

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` file from the example

```bash
copy .env.example .env
```

3. Start the backend server

```bash
node app.js
```

The server listens on `PORT` or defaults to `3000`.

## Authentication Flow

- User registration and login are handled under `/users`
- Authentication is stored in an HTTP-only `token` cookie
- Protected routes require the `IsLoggedIn` middleware
- CORS is configured with `FRONTEND_ORIGIN` and credentials are enabled

## API Endpoints

### Public

- `GET /` — home/health endpoint
- `POST /users/register` — register a new user
- `POST /users/login` — authenticate and set the JWT cookie
- `POST /users/logout` — clear the authentication cookie

### Protected (`IsLoggedIn` middleware)

- `GET /users/profile` — get the authenticated user profile

### Borrower Management

- `GET /users/borrowers` — verify borrower route is working
- `POST /users/borrowers/createBorrower` — create borrower record and initial transaction
- `GET /users/borrowers/fetchBorrowers` — fetch borrowers for the current user
- `GET /users/borrowers/fetchTransactions/:borrowerId` — fetch transactions by borrower
- `POST /users/borrowers/makeTransaction` — create a borrower transaction (`Borrowed` or `Paid`)

### Splits Management

- `POST /users/splits/createGroup` — create a new split group with members
- `GET /users/splits/fetchGroups` — fetch groups owned by the user
- `POST /users/splits/createMember` — create a standalone split member
- `GET /users/splits/fetchMemberDetails/:id` — fetch a single member by ID
- `GET /users/splits/fetchMembers/:groupId` — fetch group members by group ID

## Backend Behavior

- Connects to MongoDB on each request via `configuration/db.js`
- Uses `configuration/config.js` to validate required environment variables
- Applies CORS and cookie parsing before route handling
- Stores borrower references on the user model and transaction history in a separate collection

## Notes

- The frontend must run from the origin specified by `FRONTEND_ORIGIN`.
- Use the same port and CORS origin settings on both frontend and backend for local development.
- The backend will fail to start if any required env var is missing.
