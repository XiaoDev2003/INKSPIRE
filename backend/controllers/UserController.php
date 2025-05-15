<?php
// 📁 backend/controllers/UserController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$userModel = new User($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $user = $userModel->getById($_GET['user_id']);
            jsonResponse($user ?: ['error' => 'Không tìm thấy người dùng'], $user ? 200 : 404);
        } else {
            $users = $userModel->getAll();
            jsonResponse($users);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['username'], $data['email'])) {
            jsonResponse(['error' => 'Thiếu tên đăng nhập hoặc email'], 400);
        }
        if ($userModel->findByEmail($data['email'])) {
            jsonResponse(['error' => 'Email đã tồn tại'], 409);
        }
        $result = $userModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm người dùng thành công', 'user_id' => $conn->lastInsertId()] : ['error' => 'Thêm thất bại'], $result ? 201 : 500);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'])) {
            jsonResponse(['error' => 'Thiếu user_id'], 400);
        }
        $result = $userModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'])) {
            jsonResponse(['error' => 'Thiếu user_id'], 400);
        }
        $result = $userModel->delete($data['user_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}