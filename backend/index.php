<?php
// 📁 backend/index.php

// Cấu hình CORS cho phép truy cập từ mọi nguồn
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Xử lý lỗi và ghi log
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("Lỗi [$errno] $errstr - $errfile:$errline");
    return true;
});

// Định dạng phản hồi mặc định là JSON
header('Content-Type: application/json; charset=UTF-8');

// Tải router API
require_once __DIR__ . '/routes/api.php';
