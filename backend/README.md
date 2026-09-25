# Project BMO — PHP Backend

This backend is a lightweight PHP API for the BMO kiosk frontend. It exposes
JSON endpoints for account registration and login and stores user accounts in a
local SQLite database.

## Run locally

From the project root:

```bash
cd backend
php -S 127.0.0.1:8000
```

Then open the frontend app at http://localhost:3000.

## Auth endpoints

- POST /api/auth/register
- POST /api/auth/login

The SQLite database is stored in `backend/data/users.sqlite` and is created
automatically on first request.

## Frontend integration

The Next.js auth pages call the PHP backend at:

```text
http://localhost:8000/api/auth/register
http://localhost:8000/api/auth/login
```
