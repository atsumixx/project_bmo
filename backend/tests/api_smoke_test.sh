#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://127.0.0.1:8000"

php -S 127.0.0.1:8000 -t "$(dirname "$0")/.." >/tmp/project_bmo_backend.log 2>&1 &
SERVER_PID=$!
trap 'kill $SERVER_PID >/dev/null 2>&1 || true' EXIT

for _ in $(seq 1 40); do
  if curl -sf "$BASE_URL/" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

REGISTER_RESPONSE=$(curl -sS -X POST "$BASE_URL/api/auth/register" \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Juan","lastName":"Dela Cruz","email":"juan@example.com","phone":"+639171234567","password":"StrongPass123!","role":"patron"}')

printf '%s\n' "$REGISTER_RESPONSE"

echo "$REGISTER_RESPONSE" | grep -q '"success":true' || {
  echo 'Register endpoint did not respond successfully' >&2
  exit 1
}

LOGIN_RESPONSE=$(curl -sS -X POST "$BASE_URL/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"juan@example.com","password":"StrongPass123!"}')

printf '%s\n' "$LOGIN_RESPONSE"

echo "$LOGIN_RESPONSE" | grep -q '"success":true' || {
  echo 'Login endpoint did not respond successfully' >&2
  exit 1
}
