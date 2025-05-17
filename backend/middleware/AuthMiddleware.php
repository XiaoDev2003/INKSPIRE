<?php
// 📁 backend/middleware/AuthMiddleware.php

require_once __DIR__ . '/../utils/helpers.php';

class AuthMiddleware {
    /**
     * Kiểm tra xem người dùng đã đăng nhập hay chưa
     * Nếu chưa đăng nhập, trả về lỗi 401 Unauthorized
     */
    public function checkAuth() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để truy cập'], 401);
        }
        
        // Nếu đã đăng nhập, cho phép tiếp tục
        return true;
    }
}