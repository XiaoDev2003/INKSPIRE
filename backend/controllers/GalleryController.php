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

        // Kiểm tra user_id từ request
        if (!isset($data['uploaded_by']) || empty($data['uploaded_by'])) {
            jsonResponse(['error' => 'Thiếu thông tin người dùng (uploaded_by)'], 400);
        }

        $result = $galleryModel->create($data);
        
        // Kiểm tra nếu kết quả là mảng có chứa key 'error' và 'status'
        if (is_array($result) && isset($result['error']) && isset($result['status']) && $result['status'] === 'error') {
            jsonResponse(['error' => $result['error']], 400);
        } else {
            jsonResponse($result ? $result : ['error' => 'Thêm hình ảnh thất bại'], $result ? 201 : 500);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['image_id'], $data['image_title'], $data['image_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin cần thiết để cập nhật'], 400);
        }

        $result = $galleryModel->update($data);
        
        // Kiểm tra nếu kết quả là mảng có chứa key 'error' và 'status'
        if (is_array($result) && isset($result['error']) && isset($result['status']) && $result['status'] === 'error') {
            jsonResponse(['error' => $result['error']], 400);
        } else {
            jsonResponse($result ? $result : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        }
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