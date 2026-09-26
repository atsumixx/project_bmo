# Project BMO — SHIELD

Bridging Motions through Oral Communication — an offline-first, on-device
Filipino Sign Language (FSL) translator kiosk system, developed by Team SHIELD
(BSIT Capstone) and aligned with R.A. 11106.

## Repository layout

```
frontend/   Next.js 14 (App Router) + Tailwind CSS web app
backend/    Reserved for future non-auth server-side logic
```

Each app is self-contained: `frontend/` has its own `package.json`,
`package-lock.json`, and config files, and is run independently of
`backend/`. This keeps dependencies, scripts, and lockfiles from colliding
once the backend gets real code.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000. See `frontend/README.md` for details on the
component structure, image handling, and known follow-ups.

## Backend

No custom backend is currently used for authentication. Auth, sessions, and
user data are handled directly by Supabase (Postgres + Supabase Auth) from the
frontend via `@supabase/supabase-js`.

This folder is reserved for future non-auth server-side logic such as an
edge-inference bridge, kiosk session handling, or endpoints Supabase Auth does
not cover. Nothing is implemented here yet.
