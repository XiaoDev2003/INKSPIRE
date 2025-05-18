<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
  header("Access-Control-Allow-Origin: $origin");
} // Thay đổi thành origin của frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // Cho phép gửi cookies

// Xử lý preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  // Cần exit ở đây để trả về header CORS cho preflight request
  exit();
}

require_once __DIR__ . '/routes/api.php';
