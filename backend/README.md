# Project BMO — Backend

No custom backend is currently used for authentication. Auth, sessions, and
user data are all handled directly by Supabase (Postgres + Supabase Auth) via
the frontend's `@supabase/supabase-js` client — see `frontend/lib/supabase.js`
and `frontend/lib/useAuth.js`.

This folder is reserved for future non-auth server-side logic (e.g. an
edge-inference bridge, kiosk session handling, or endpoints Supabase Auth
doesn't cover). Nothing here yet.

