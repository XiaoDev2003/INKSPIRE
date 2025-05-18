<?php
// 📁 backend/middleware/AdminMiddleware.php

require_once __DIR__ . '/../models/Auth.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/helpers.php';

class AdminMiddleware {
    private $authModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->authModel = new Auth($conn);
    }

    /**
     * Kiểm tra xem người dùng hiện tại có quyền admin hay không
     * Nếu không có quyền, trả về lỗi 403 Forbidden
     */
    public function checkAdminAccess() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để truy cập'], 401);
        }

        // Kiểm tra xem người dùng có quyền admin không từ session
        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            // Kiểm tra lại từ database để đảm bảo thông tin chính xác
            $userId = $_SESSION['user_id'];
            $isAdmin = $this->authModel->isAdmin($userId);

            if (!$isAdmin) {
                jsonResponse(['error' => 'Bạn không có quyền truy cập vào tài nguyên này'], 403);
            } else {
                // Cập nhật lại session nếu có sự khác biệt
                $_SESSION['role'] = 'admin';
            }
        }

        // Nếu có quyền admin, cho phép tiếp tục
        return true;
    }
}