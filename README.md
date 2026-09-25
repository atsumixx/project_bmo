# Project BMO — SHIELD

Bridging Silence with Physical AI — an offline-first, on-device Filipino Sign
Language (FSL) translator kiosk system, developed by Team SHIELD (BSIT
Capstone) in compliance with R.A. 11106.

## Repository layout

```
frontend/   Next.js 14 (App Router) + Tailwind CSS web app
backend/    API / services (placeholder — not yet implemented)
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

Not implemented yet. This folder is a placeholder for the API/service layer
(e.g. the edge-inference bridge, kiosk session handling, or any REST/GraphQL
endpoints the frontend will eventually call). Add its own `package.json` (or
equivalent for whatever stack you pick) inside `backend/` when you start it,
following the same self-contained pattern as `frontend/`.
