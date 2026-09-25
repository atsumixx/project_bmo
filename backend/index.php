<?php

declare(strict_types=1);

// ---------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------
$allowedOrigin = getenv('FRONTEND_ORIGIN') ?: 'http://localhost:3000';
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function sendJson(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

// ---------------------------------------------------------------------
// Database connection (Supabase Postgres)
//
// Configure via environment variables (e.g. in a .env loaded by your
// process manager, or exported before `php -S`):
//
//   SUPABASE_DB_HOST      e.g. aws-0-ap-southeast-1.pooler.supabase.com
//   SUPABASE_DB_PORT      e.g. 6543 (transaction pooler) or 5432 (direct)
//   SUPABASE_DB_NAME      usually "postgres"
//   SUPABASE_DB_USER      e.g. postgres.xxxxxxxxxxxx (pooler) or postgres
//   SUPABASE_DB_PASSWORD  your database password
//
// These come from: Supabase dashboard -> Project Settings -> Database
// -> Connection string / Connection pooling.
// ---------------------------------------------------------------------

$dbHost = getenv('SUPABASE_DB_HOST') ?: '';
$dbPort = getenv('SUPABASE_DB_PORT') ?: '6543';
$dbName = getenv('SUPABASE_DB_NAME') ?: 'postgres';
$dbUser = getenv('SUPABASE_DB_USER') ?: '';
$dbPassword = getenv('SUPABASE_DB_PASSWORD') ?: '';

if ($dbHost === '' || $dbUser === '' || $dbPassword === '') {
    sendJson(500, [
        'success' => false,
        'message' => 'Database is not configured. Set SUPABASE_DB_HOST, SUPABASE_DB_USER, and SUPABASE_DB_PASSWORD as environment variables.',
    ]);
}

try {
    $dsn = sprintf(
        'pgsql:host=%s;port=%s;dbname=%s;sslmode=require',
        $dbHost,
        $dbPort,
        $dbName
    );
    $db = new PDO($dsn, $dbUser, $dbPassword);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (Throwable $e) {
    sendJson(500, [
        'success' => false,
        'message' => 'Database connection failed.',
        'error' => $e->getMessage(),
    ]);
}

// Table is expected to already exist in Supabase (created via SQL editor):
//
//   create table public.users (
//     id serial primary key,
//     first_name text not null,
//     last_name text not null,
//     email text not null unique,
//     phone text,
//     password_hash text not null,
//     role text not null default 'patron',
//     created_at timestamptz not null default now()
//   );
//
// No CREATE TABLE IF NOT EXISTS here — Supabase tables are managed via
// migrations/SQL editor, not auto-created by the app.

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

if ($method === 'GET' && $uri === '/') {
    sendJson(200, [
        'success' => true,
        'service' => 'Project BMO PHP API',
        'message' => 'Backend is running.',
        'database' => 'supabase-postgres',
        'endpoints' => [
            'POST /api/auth/register',
            'POST /api/auth/login',
        ],
    ]);
}

if ($method !== 'POST') {
    sendJson(405, [
        'success' => false,
        'message' => 'Only POST requests are supported for the auth API.',
    ]);
}

$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = [];
}

if ($uri === '/api/auth/register') {
    $firstName = trim((string) ($input['firstName'] ?? ''));
    $lastName = trim((string) ($input['lastName'] ?? ''));
    $email = trim(strtolower((string) ($input['email'] ?? '')));
    $phone = trim((string) ($input['phone'] ?? ''));
    $password = (string) ($input['password'] ?? '');
    $role = strtolower(trim((string) ($input['role'] ?? 'patron')));

    if ($firstName === '' || $lastName === '' || $email === '' || $password === '') {
        sendJson(400, [
            'success' => false,
            'message' => 'First name, last name, email, and password are required.',
        ]);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(400, [
            'success' => false,
            'message' => 'Please provide a valid email address.',
        ]);
    }

    if (strlen($password) < 8) {
        sendJson(400, [
            'success' => false,
            'message' => 'Password must be at least 8 characters long.',
        ]);
    }

    $role = in_array($role, ['patron', 'teller', 'desk_teller', 'civic_desk', 'research'], true) ? $role : 'patron';

    try {
        $existing = $db->prepare('SELECT id FROM users WHERE email = :email');
        $existing->execute([':email' => $email]);
        if ($existing->fetch()) {
            sendJson(409, [
                'success' => false,
                'message' => 'An account with this email already exists.',
            ]);
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $statement = $db->prepare(
            'INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
             VALUES (:first_name, :last_name, :email, :phone, :password_hash, :role)
             RETURNING id'
        );
        $statement->execute([
            ':first_name' => $firstName,
            ':last_name' => $lastName,
            ':email' => $email,
            ':phone' => $phone,
            ':password_hash' => $passwordHash,
            ':role' => $role,
        ]);

        $userId = (int) $statement->fetchColumn();
    } catch (Throwable $e) {
        sendJson(500, [
            'success' => false,
            'message' => 'Could not create account.',
            'error' => $e->getMessage(),
        ]);
    }

    $token = bin2hex(random_bytes(16));

    sendJson(201, [
        'success' => true,
        'message' => 'Account created successfully.',
        'token' => $token,
        'user' => [
            'id' => $userId,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'phone' => $phone,
            'role' => $role,
        ],
    ]);
}

if ($uri === '/api/auth/login') {
    $email = trim(strtolower((string) ($input['email'] ?? '')));
    $password = (string) ($input['password'] ?? '');

    if ($email === '' || $password === '') {
        sendJson(400, [
            'success' => false,
            'message' => 'Email and password are required.',
        ]);
    }

    try {
        $statement = $db->prepare(
            'SELECT id, first_name, last_name, email, phone, role, password_hash
             FROM users WHERE email = :email'
        );
        $statement->execute([':email' => $email]);
        $user = $statement->fetch();
    } catch (Throwable $e) {
        sendJson(500, [
            'success' => false,
            'message' => 'Login failed.',
            'error' => $e->getMessage(),
        ]);
    }

    if (!$user || !password_verify($password, (string) $user['password_hash'])) {
        sendJson(401, [
            'success' => false,
            'message' => 'Invalid email or password.',
        ]);
    }

    unset($user['password_hash']);
    $token = bin2hex(random_bytes(16));

    sendJson(200, [
        'success' => true,
        'message' => 'Login successful.',
        'token' => $token,
        'user' => [
            'id' => (int) $user['id'],
            'firstName' => $user['first_name'],
            'lastName' => $user['last_name'],
            'email' => $user['email'],
            'phone' => $user['phone'],
            'role' => $user['role'],
        ],
    ]);
}

sendJson(404, [
    'success' => false,
    'message' => 'Endpoint not found.',
]);
