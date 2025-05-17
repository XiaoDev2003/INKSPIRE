<?php
// 📁 backend/controllers/AuthController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Auth.php';
require_once __DIR__ . '/../utils/helpers.php';

class AuthController {
    private $authModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->authModel = new Auth($conn);
    }

    public function register() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Only POST allowed'], 405);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['username'], $data['email'], $data['password'])) {
            jsonResponse(['error' => 'Missing fields'], 400);
        }

        $username = sanitizeInput($data['username']);
        $email = sanitizeInput($data['email']);
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

        if ($this->authModel->findByEmail($email)) {
            jsonResponse(['error' => 'Email already registered'], 409);
        }

        $success = $this->authModel->registerUser($username, $email, $passwordHash);

        if (!$success) {
            // Debug lỗi SQL nếu có
            error_log("\n\nRegister failed: " . json_encode($this->authModel->lastError()), 3, __DIR__ . '/../logs/error.log');
        }

        jsonResponse($success ? ['message' => 'User registered successfully'] : ['error' => 'Registration failed'], $success ? 200 : 500);
    }

    public function login() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Only POST allowed'], 405);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email'], $data['password'])) {
            jsonResponse(['error' => 'Missing fields'], 400);
        }

        $email = sanitizeInput($data['email']);
        $password = $data['password'];

        $user = $this->authModel->verifyLogin($email, $password);

        if ($user) {
            // Khởi tạo session nếu chưa có
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }

            // Lưu thông tin người dùng vào session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['is_logged_in'] = true;

            // Xóa mật khẩu trước khi trả về
            unset($user['password_hash']);

            // Thêm thông tin về quyền admin
            $user['is_admin'] = ($user['role'] === 'admin');

            jsonResponse([
                'success' => true,
                'message' => 'Đăng nhập thành công',
                'user' => $user
            ]);
        } else {
            jsonResponse(['error' => 'Thông tin đăng nhập không hợp lệ'], 401);
        }
    }

    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Xóa tất cả dữ liệu session
        $_SESSION = [];

        // Xóa cookie session
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        // Hủy session
        session_destroy();

        jsonResponse(['success' => true, 'message' => 'Đăng xuất thành công']);
    }

    public function getCurrentUser() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['user_id']) && $_SESSION['is_logged_in']) {
            $user = $this->authModel->findById($_SESSION['user_id']);
            if ($user) {
                unset($user['password_hash']);
                $user['is_admin'] = ($user['role'] === 'admin');
                jsonResponse(['success' => true, 'user' => $user]);
            }
        }

        jsonResponse(['error' => 'Không có người dùng đăng nhập'], 401);
    }
    }
}