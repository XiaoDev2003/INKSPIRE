<?php
// 📁 backend/controllers/ItemController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Item.php';
require_once __DIR__ . '/../utils/helpers.php';

class ItemController {
    private $itemModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->itemModel = new Item($conn);
    }

    public function getItems() {
        if (isset($_GET['item_id'])) {
            $item = $this->itemModel->getById($_GET['item_id']);
            jsonResponse($item ?: ['error' => 'Không tìm thấy'], $item ? 200 : 404);
        } else {
            // Thêm phân trang để cải thiện hiệu suất
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
            
            // Đảm bảo giá trị hợp lệ
            $page = max(1, $page);
            $limit = max(1, min(100, $limit)); // Giới hạn tối đa 100 items mỗi trang
            
            $items = $this->itemModel->getAll($page, $limit);
            $totalItems = $this->itemModel->getTotalCount();
            
            jsonResponse([
                'items' => $items,
                'pagination' => [
                    'total' => $totalItems,
                    'page' => $page,
                    'limit' => $limit,
                    'total_pages' => ceil($totalItems / $limit)
                ]
            ]);
        }
    }

    public function createItem() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_name'], $data['category_id'], $data['item_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin bắt buộc'], 400);
        }
        // Giả định lấy author_id từ session (thay bằng logic xác thực thực tế)
        $data['author_id'] = $data['author_id'] ?? 1;
        $result = $this->itemModel->create($data);
        jsonResponse($result ? $result : ['error' => 'Thêm thất bại'], $result ? 201 : 500);
    }

    public function updateItem() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_id'], $data['item_name'], $data['item_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin cần thiết để cập nhật'], 400);
        }
        $data['author_id'] = $data['author_id'] ?? 1;
        $result = $this->itemModel->update($data);
        jsonResponse($result ? $result : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
    }

    public function deleteItem() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['item_id'])) {
            jsonResponse(['error' => 'Thiếu item_id'], 400);
        }
        $result = $this->itemModel->delete($data['item_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
    }
}