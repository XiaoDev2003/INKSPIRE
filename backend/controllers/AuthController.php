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

        // Khởi tạo session trước khi xử lý đăng nhập
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email'], $data['password'])) {
            jsonResponse(['error' => 'Missing fields'], 400);
        }

        $login = sanitizeInput($data['email']); // Có thể là email hoặc username
        $password = $data['password'];

        $user = $this->authModel->verifyLogin($login, $password);

        if ($user) {
            // Kiểm tra quyền admin từ database
            $isAdmin = $this->authModel->isAdmin($user['user_id']);

            // Đảm bảo role được cập nhật chính xác
            $user['role'] = $isAdmin ? 'admin' : 'user';

            // Lưu thông tin người dùng vào session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['is_logged_in'] = true;

            // Đảm bảo session được lưu
            session_write_close();

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

    /**
     * Xác thực quyền admin từ database
     * Endpoint này được gọi từ AdminLayout để kiểm tra quyền truy cập
     */
    public function verifyAdmin() {
        // Kiểm tra phương thức request
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            jsonResponse(['error' => 'Chỉ chấp nhận phương thức GET'], 405);
        }

        // Lấy token từ header Authorization
        $headers = getallheaders();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

        if (empty($authHeader) || !preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
            jsonResponse(['error' => 'Token không hợp lệ'], 401);
        }

        // Kiểm tra session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để truy cập', 'success' => false], 401);
        }

        // Kiểm tra quyền admin từ database
        $userId = $_SESSION['user_id'];
        $isAdmin = $this->authModel->isAdmin($userId);

        if ($isAdmin) {
            // Lấy thông tin người dùng
            $user = $this->authModel->findById($userId);
            unset($user['password_hash']); // Xóa mật khẩu trước khi trả về

            jsonResponse([
                'success' => true,
                'isAdmin' => true,
                'message' => 'Xác thực admin thành công',
                'user' => $user
            ]);
        } else {
            jsonResponse([
                'success' => false,
                'isAdmin' => false,
                'message' => 'Bạn không có quyền admin'
            ], 403);
        }
    }

    public function getCurrentUser() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['user_id']) && $_SESSION['is_logged_in']) {
            $user = $this->authModel->findById($_SESSION['user_id']);
            if ($user) {
                // Kiểm tra quyền admin từ database
                $isAdmin = $this->authModel->isAdmin($user['user_id']);

                // Cập nhật role trong session nếu có sự khác biệt
                if ($isAdmin && (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin')) {
                    $_SESSION['role'] = 'admin';
                }

                // Đảm bảo role trong user object phản ánh đúng quyền
                $user['role'] = $isAdmin ? 'admin' : 'user';

                unset($user['password_hash']);
                $user['is_admin'] = $isAdmin;
                jsonResponse(['success' => true, 'user' => $user]);
            }
        }

        jsonResponse(['error' => 'Không có người dùng đăng nhập'], 401);
    }
}