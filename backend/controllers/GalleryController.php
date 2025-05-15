<?php
// 📁 backend/controllers/GalleryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Gallery.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$galleryModel = new Gallery($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['image_id'])) {
            $gallery = $galleryModel->getById($_GET['image_id']);
            jsonResponse($gallery ?: ['error' => 'Không tìm thấy hình ảnh'], $gallery ? 200 : 404);
        } else {
            $galleries = $galleryModel->getAll();
            jsonResponse($galleries);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['image_title'], $data['image_url'])) {
            jsonResponse(['error' => 'Thiếu tiêu đề hoặc URL hình ảnh'], 400);
        }

        // Giả định user_id của người dùng hiện tại (có thể thay bằng logic xác thực)
        $data['uploaded_by'] = $data['uploaded_by'] ?? 1; // Mặc định user_id = 1

        $result = $galleryModel->create($data);
        jsonResponse($result ? $result : ['error' => 'Thêm hình ảnh thất bại'], $result ? 201 : 500);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['image_id'], $data['image_title'], $data['image_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin cần thiết để cập nhật'], 400);
        }

        $result = $galleryModel->update($data);
        jsonResponse($result ? $result : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['image_id'])) {
            jsonResponse(['error' => 'Thiếu image_id'], 400);
        }
        $result = $galleryModel->delete($data['image_id']);
        jsonResponse($result ? ['message' => 'Xóa hình ảnh thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}