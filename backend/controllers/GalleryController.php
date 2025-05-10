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
        if (isset($_GET['gallery_id'])) {
            $gallery = $galleryModel->getById($_GET['gallery_id']);
            jsonResponse($gallery ?: ['error' => 'Không tìm thấy'], $gallery ? 200 : 404);
        } else {
            $galleries = $galleryModel->getAll();
            jsonResponse($galleries);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['title'], $data['image_url'], $data['category_id'], $data['item_id'])) {
            jsonResponse(['error' => 'Thiếu thông tin hình ảnh'], 400);
        }

        $result = $galleryModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm ảnh thành công'] : ['error' => 'Thêm ảnh thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $data);
        if (!isset($data['gallery_id'])) {
            jsonResponse(['error' => 'Thiếu gallery_id'], 400);
        }
        $result = $galleryModel->delete($data['gallery_id']);
        jsonResponse($result ? ['message' => 'Xóa ảnh thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}