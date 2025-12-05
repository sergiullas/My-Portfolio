<?php
file_put_contents("debug.log", print_r($_POST, true));
// Simple contact form handler for portfolio site
// - Accepts POST requests with name, email, message, and honeypot company field
// - Validates inputs and attempts to send an email
// - Returns JSON responses indicating success or validation/server errors

// Allowed origins for CORS (production + local dev)
$allowed_origins = [
    'https://sergioantezana.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot spam check
$company = trim($_POST['company'] ?? '');
if ($company !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if ($name === '') {
    $errors['name'] = 'Name is required.';
}

if ($email === '') {
    $errors['email'] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please provide a valid email address.';
}

if ($message === '') {
    $errors['message'] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// Basic sanitization to prevent header injection and escape HTML
$safe_name = htmlspecialchars(str_replace(["\r", "\n"], ' ', $name), ENT_QUOTES, 'UTF-8');
$safe_email = str_replace(["\r", "\n"], '', $email);
$safe_message = htmlspecialchars(trim($message), ENT_QUOTES, 'UTF-8');

$to = 'santezana@nayas.com';
$subject = 'New contact form message';
$body_lines = [
    "Name: {$safe_name}",
    "Email: {$safe_email}",
    '',
    $safe_message,
];
$body = implode("\n", $body_lines);

$headers = [
    'From: Portfolio Contact <no-reply@sergioantezana.com>',
    "Reply-To: {$safe_email}",
];

$mail_sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$mail_sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email.']);
    exit;
}

echo json_encode(['ok' => true]);
