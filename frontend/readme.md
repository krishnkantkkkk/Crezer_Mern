# Crezer Frontend

A modern React frontend for the Crezer MERN application, built with Vite, Tailwind CSS, and React Router. This frontend provides an intuitive interface for managing borrowers, tracking transactions, and splitting expenses across groups.

## Key Features

- **User authentication** with login, registration, and logout flows
- **Borrower management** including add, update, and delete borrower records
- **Expense tracking** with transaction creation and history display
- **Group splits** for sharing expenses among multiple members
- **Responsive UI** with reusable components and consistent styling
- **API-driven** integration via Axios context

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zod for validation
- Fuse.js for search functionality
- Lucide React for icons

## Project Structure

- `src/App.jsx` — application root and route definitions
- `src/main.jsx` — bootstrap entry file
- `src/index.css` — global styles
- `src/components/` — reusable UI components
- `src/pages/` — page views for dashboard, groups, authentication, and splits
- `src/contexts/` — shared application context for Axios and user state
- `src/protectWrapper/` — route protection and redirect wrappers
- `src/sections/` — landing page section

## Setup and Installation

1. Install dependencies

```bash
cd frontend
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the app in your browser

```text
http://localhost:5173
```

## Environment Variables

The frontend uses a Vite environment variable to configure the backend API base URL.

- `VITE_BASE_URL` — backend API base URL (for example `http://localhost:3000`)

Example `.env`:

```env
VITE_BASE_URL='http://localhost:3000'
```

The frontend expects the backend API to be available and configured through the application context. Update the Axios context or environment settings as needed to point to the backend server.

## Notes

- Keep the backend server running while using the frontend to ensure API requests succeed.
- Tailwind CSS is configured through Vite and used directly in component markup for styling.

## Recommended Improvements

- Add unit and integration tests for components and pages
- Document backend API endpoints and required payload structures
- Add environment file support for backend base URL and feature flags

## License

This frontend is part of the Crezer MERN project and is available for internal development and collaboration.
