<?php
// 📁 backend/controllers/CategoryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$categoryModel = new Category($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['category_id'])) {
            $category = $categoryModel->getById($_GET['category_id']);
            jsonResponse($category ?: ['error' => 'Không tìm thấy'], $category ? 200 : 404);
        } else {
            $categories = $categoryModel->getAll();
            jsonResponse($categories);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_name'], $data['category_type'])) {
            jsonResponse(['error' => 'Thiếu tên và loại phong cách'], 400);
        }
        $result = $categoryModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm category thành công', 'category_id' => $conn->lastInsertId()] : ['error' => 'Thêm thất bại'], $result ? 201 : 500);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_id'])) {
            jsonResponse(['error' => 'Thiếu category_id'], 400);
        }
        $result = $categoryModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_id'])) {
            jsonResponse(['error' => 'Thiếu category_id'], 400);
        }
        $result = $categoryModel->delete($data['category_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}