<?php
// 📁 backend/controllers/ItemController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Item.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$itemModel = new Item($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['item_id'])) {
            $item = $itemModel->getById($_GET['item_id']);
            jsonResponse($item ?: ['error' => 'Không tìm thấy'], $item ? 200 : 404);
        } else {
            $items = $itemModel->getAll();
            jsonResponse($items);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_name'], $data['category_id'], $data['item_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin bắt buộc'], 400);
        }
        // Giả định lấy author_id từ session (thay bằng logic xác thực thực tế)
        $data['author_id'] = $data['author_id'] ?? 1;
        $result = $itemModel->create($data);
        jsonResponse($result ? $result : ['error' => 'Thêm thất bại'], $result ? 201 : 500);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_id'], $data['item_name'], $data['item_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin cần thiết để cập nhật'], 400);
        }
        $data['author_id'] = $data['author_id'] ?? 1;
        $result = $itemModel->update($data);
        jsonResponse($result ? $result : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_id'])) {
            jsonResponse(['error' => 'Thiếu item_id'], 400);
        }
        $result = $itemModel->delete($data['item_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}