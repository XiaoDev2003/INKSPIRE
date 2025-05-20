<?php
// 📁 backend/controllers/UserController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/helpers.php';

class UserController {
    private $userModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->userModel = new User($conn);
    }

    // Phương thức handleRequest đã được loại bỏ để tuân theo mẫu OOP nhất quán
    // Các phương thức riêng lẻ sẽ được gọi trực tiếp từ routes/api.php
    
    public function getUsers() {
        if (isset($_GET['user_id'])) {
            $user = $this->userModel->getById($_GET['user_id']);
            jsonResponse($user ?: ['error' => 'Không tìm thấy người dùng'], $user ? 200 : 404);
        } else {
            $users = $this->userModel->getAll();
            jsonResponse($users);
        }
    }

    public function createUser() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['username'], $data['email'])) {
            jsonResponse(['error' => 'Thiếu tên đăng nhập hoặc email'], 400);
        }
        if ($this->userModel->findByEmail($data['email'])) {
            jsonResponse(['error' => 'Email đã tồn tại'], 409);
        }
        $result = $this->userModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm người dùng thành công', 'user_id' => $this->userModel->getLastInsertId()] : ['error' => 'Thêm thất bại'], $result ? 201 : 500);
    }

    public function updateUser() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'])) {
            jsonResponse(['error' => 'Thiếu user_id'], 400);
        }
        $result = $this->userModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
    }

    public function deleteUser() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'])) {
            jsonResponse(['error' => 'Thiếu user_id'], 400);
        }
        $result = $this->userModel->delete($data['user_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
    }

    public function updateProfile() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Chỉ chấp nhận phương thức POST'], 405);
        }

        // Kiểm tra session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để cập nhật thông tin'], 401);
        }

        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents("php://input"), true);

        // Kiểm tra dữ liệu đầu vào
        if (!$data) {
            jsonResponse(['error' => 'Dữ liệu không hợp lệ'], 400);
        }

        // Lọc và xử lý dữ liệu
        $updateData = [];
        $allowedFields = ['first_name', 'last_name', 'phone', 'gender', 'avatar_url'];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updateData[$field] = sanitizeInput($data[$field]);
            }
        }

        if (empty($updateData)) {
            jsonResponse(['error' => 'Không có dữ liệu để cập nhật'], 400);
        }

        // Cập nhật thông tin người dùng
        $success = $this->userModel->updateUser($userId, $updateData);

        if ($success) {
            // Lấy thông tin người dùng đã cập nhật
            $updatedUser = $this->userModel->getUserById($userId);
            unset($updatedUser['password_hash']); // Xóa mật khẩu trước khi trả về

            jsonResponse([
                'success' => true,
                'message' => 'Cập nhật thông tin thành công',
                'user' => $updatedUser
            ]);
        } else {
            jsonResponse(['error' => 'Cập nhật thông tin thất bại'], 500);
        }
    }

    public function changePassword() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Chỉ chấp nhận phương thức POST'], 405);
        }

        // Kiểm tra session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để đổi mật khẩu'], 401);
        }

        $userId = $_SESSION['user_id'];
        $data = json_decode(file_get_contents("php://input"), true);

        // Kiểm tra dữ liệu đầu vào
        if (!isset($data['current_password'], $data['new_password'])) {
            jsonResponse(['error' => 'Thiếu thông tin mật khẩu'], 400);
        }

        // Kiểm tra độ dài mật khẩu mới
        if (strlen($data['new_password']) < 6) {
            jsonResponse(['error' => 'Mật khẩu mới phải có ít nhất 6 ký tự'], 400);
        }

        // Kiểm tra mật khẩu hiện tại
        $currentPasswordValid = $this->userModel->verifyPassword($userId, $data['current_password']);
        if (!$currentPasswordValid) {
            jsonResponse(['error' => 'Mật khẩu hiện tại không đúng'], 400);
        }

        // Mã hóa mật khẩu mới
        $newPasswordHash = password_hash($data['new_password'], PASSWORD_DEFAULT);

        // Cập nhật mật khẩu
        $success = $this->userModel->updatePassword($userId, $newPasswordHash);

        if ($success) {
            jsonResponse([
                'success' => true,
                'message' => 'Đổi mật khẩu thành công'
            ]);
        } else {
            jsonResponse(['error' => 'Đổi mật khẩu thất bại'], 500);
        }
    }

    public function getUserProfile() {
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            jsonResponse(['error' => 'Chỉ chấp nhận phương thức GET'], 405);
        }

        // Kiểm tra session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isset($_SESSION['user_id']) || !$_SESSION['is_logged_in']) {
            jsonResponse(['error' => 'Bạn cần đăng nhập để xem thông tin'], 401);
        }

        $userId = $_SESSION['user_id'];

        // Lấy thông tin người dùng
        $user = $this->userModel->getUserById($userId);
        if ($user) {
            unset($user['password_hash']); // Xóa mật khẩu trước khi trả về
            jsonResponse([
                'success' => true,
                'user' => $user
            ]);
        } else {
            jsonResponse(['error' => 'Không tìm thấy thông tin người dùng'], 404);
        }
    }
}