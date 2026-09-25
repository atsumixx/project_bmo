<?php

declare(strict_types=1);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
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

$databaseDir = __DIR__ . '/data';
if (!is_dir($databaseDir)) {
    mkdir($databaseDir, 0777, true);
}

$databasePath = $databaseDir . '/users.sqlite';

try {
    $db = new PDO('sqlite:' . $databasePath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $db->exec('CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT "patron",
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )');
} catch (Throwable $e) {
    sendJson(500, [
        'success' => false,
        'message' => 'Database connection failed.',
        'error' => $e->getMessage(),
    ]);
}

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

if ($method === 'GET' && $uri === '/') {
    sendJson(200, [
        'success' => true,
        'service' => 'Project BMO PHP API',
        'message' => 'Backend is running.',
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

    $existing = $db->prepare('SELECT id FROM users WHERE email = :email');
    $existing->execute([':email' => $email]);
    if ($existing->fetch()) {
        sendJson(409, [
            'success' => false,
            'message' => 'An account with this email already exists.',
        ]);
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $statement = $db->prepare('INSERT INTO users (first_name, last_name, email, phone, password_hash, role) VALUES (:first_name, :last_name, :email, :phone, :password_hash, :role)');
    $statement->execute([
        ':first_name' => $firstName,
        ':last_name' => $lastName,
        ':email' => $email,
        ':phone' => $phone,
        ':password_hash' => $passwordHash,
        ':role' => $role,
    ]);

    $userId = (int) $db->lastInsertId();
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

    $statement = $db->prepare('SELECT id, first_name, last_name, email, phone, role, password_hash FROM users WHERE email = :email');
    $statement->execute([':email' => $email]);
    $user = $statement->fetch();

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
