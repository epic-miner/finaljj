# Calm Corners

A web application designed to simplify study space discovery and booking for students, providing real-time availability tracking and seamless reservation management.

## Features

- Browse and search for study spaces
- View real-time availability of seats
- Book study spaces with specific time slots
- Admin panel for managing study spaces and updating seat availability
- Responsive design for both desktop and mobile

## Tech Stack

- React.js with TypeScript for the frontend
- Express.js for the backend API
- In-memory storage (can be adapted for database storage)
- TailwindCSS and ShadcnUI for styling
- Framer Motion for animations

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update values as needed
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment Instructions

### Deploying to Vercel

1. Fork/push this repository to GitHub
2. Create a new project in Vercel and connect to your GitHub repository
3. Set the following environment variables in Vercel:
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: (generate a random string for session security)
   - `VITE_ADMIN_PASSWORD`: (set your custom admin password)
4. Deploy!

### Deploying to Render

1. Fork/push this repository to GitHub
2. Create a new Web Service in Render and connect to your GitHub repository
3. Configure the following settings:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
4. Set the following environment variables in Render:
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: (generate a random string for session security)
   - `VITE_ADMIN_PASSWORD`: (set your custom admin password)
5. Deploy the service

## Admin Access

The default admin password is `admin123`. To access the admin panel, go to `/admin/login` and use this password. For security in production, change the password by setting the `VITE_ADMIN_PASSWORD` environment variable.

## License

MIT