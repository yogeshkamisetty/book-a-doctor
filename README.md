# Book A Doctor

MERN-style booking app: **Express + MongoDB + JWT** API and a **Next.js** frontend (patient, doctor, admin flows, appointments, medical report uploads).

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Backend setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from the example and set your values:

   ```bash
   copy .env.example .env
   ```

   Required: `MONGO_URI`, `JWT_SECRET`, `PORT` (optional, defaults to `5000`), `FRONTEND_ORIGIN` (e.g. `http://localhost:3000`).

3. (Optional) Seed demo approved doctors:

   ```bash
   npm run seed:doctors
   ```

4. Start the API:

   ```bash
   npm run dev
   ```

   API base URL: `http://localhost:5000` (or your `PORT`).

5. **First admin:** register a user in the app, then promote them:

   ```bash
   node seedAdminRole.js you@example.com
   ```

## Frontend setup

1. Install and configure:

   ```bash
   cd frontend
   npm install
   ```

2. Create `frontend/.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Production notes

- Use a strong `JWT_SECRET` and HTTPS in production.
- If using Atlas, allow your server IP (or `0.0.0.0/0` for testing only) in Network Access.
- Build the frontend with `npm run build` and `npm run start` inside `frontend/`.

## API overview

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/doctors` — query params: `q`, `timeSlot`
- Appointments, admin, and reports under `/api/appointments`, `/api/admin`, `/api/reports` (see route files for details).
