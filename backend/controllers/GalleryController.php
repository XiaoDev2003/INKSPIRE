<?php
// 📁 backend/controllers/GalleryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Gallery.php';
require_once __DIR__ . '/../utils/helpers.php';

class GalleryController {
    private $galleryModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->galleryModel = new Gallery($conn);
    }

    // Phương thức handleRequest đã được loại bỏ để tuân theo mẫu OOP nhất quán
    // Các phương thức riêng lẻ sẽ được gọi trực tiếp từ routes/api.php

    public function getGalleries() {
        if (isset($_GET['image_id'])) {
            $gallery = $this->galleryModel->getById($_GET['image_id']);
            jsonResponse($gallery ?: ['error' => 'Không tìm thấy hình ảnh'], $gallery ? 200 : 404);
        } else {
            // Thêm phân trang để cải thiện hiệu suất
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 40;
            
            // Đảm bảo giá trị hợp lệ
            $page = max(1, $page);
            $limit = max(1, min(100, $limit)); // Giới hạn tối đa 100 items mỗi trang
            
            $galleries = $this->galleryModel->getAll($page, $limit);
            $totalItems = $this->galleryModel->getTotalCount();
            
            jsonResponse([
                'galleries' => $galleries,
                'pagination' => [
                    'total' => $totalItems,
                    'page' => $page,
                    'limit' => $limit,
                    'total_pages' => ceil($totalItems / $limit)
                ]
            ]);
        }
    }

    public function createGallery() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['image_title'], $data['image_url'])) {
            jsonResponse(['error' => 'Thiếu tiêu đề hoặc URL hình ảnh'], 400);
        }

        // Kiểm tra user_id từ request
        if (!isset($data['uploaded_by']) || empty($data['uploaded_by'])) {
            jsonResponse(['error' => 'Thiếu thông tin người dùng (uploaded_by)'], 400);
        }

        $result = $this->galleryModel->create($data);
        
        // Kiểm tra nếu kết quả là mảng có chứa key 'error' và 'status'
        if (is_array($result) && isset($result['error']) && isset($result['status']) && $result['status'] === 'error') {
            jsonResponse(['error' => $result['error']], 400);
        } else {
            jsonResponse($result ? $result : ['error' => 'Thêm hình ảnh thất bại'], $result ? 201 : 500);
        }
    }

    public function updateGallery() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['image_id'], $data['image_title'], $data['image_url'])) {
            jsonResponse(['error' => 'Thiếu thông tin cần thiết để cập nhật'], 400);
        }

        $result = $this->galleryModel->update($data);
        
        // Kiểm tra nếu kết quả là mảng có chứa key 'error' và 'status'
        if (is_array($result) && isset($result['error']) && isset($result['status']) && $result['status'] === 'error') {
            jsonResponse(['error' => $result['error']], 400);
        } else {
            jsonResponse($result ? $result : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        }
    }

    public function deleteGallery() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['image_id'])) {
            jsonResponse(['error' => 'Thiếu image_id'], 400);
        }
        $result = $this->galleryModel->delete($data['image_id']);
        jsonResponse($result ? ['message' => 'Xóa hình ảnh thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
    }
}