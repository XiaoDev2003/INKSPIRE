<?php
// 📁 backend/controllers/CategoryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Category.php';
require_once __DIR__ . '/../utils/helpers.php';

class CategoryController {
    private $categoryModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->categoryModel = new Category($conn);
    }

    // Phương thức handleRequest đã được loại bỏ để tuân theo mẫu OOP nhất quán
    // Các phương thức riêng lẻ sẽ được gọi trực tiếp từ routes/api.php

    public function getCategories() {
        if (isset($_GET['category_id'])) {
            $category = $this->categoryModel->getById($_GET['category_id']);
            jsonResponse($category ?: ['error' => 'Không tìm thấy'], $category ? 200 : 404);
        } else {
            $categories = $this->categoryModel->getAll();
            jsonResponse($categories);
        }
    }

    public function createCategory() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_name'], $data['category_type'])) {
            jsonResponse(['error' => 'Thiếu tên và loại phong cách'], 400);
        }
        $result = $this->categoryModel->create($data);
        jsonResponse($result ? 
            ['message' => 'Thêm category thành công', 'category_id' => $this->categoryModel->getLastInsertId()] : 
            ['error' => 'Thêm thất bại'], 
            $result ? 201 : 500);
    }

    public function updateCategory() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_id'])) {
            jsonResponse(['error' => 'Thiếu category_id'], 400);
        }
        $result = $this->categoryModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
    }

    public function deleteCategory() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['category_id'])) {
            jsonResponse(['error' => 'Thiếu category_id'], 400);
        }
        $result = $this->categoryModel->delete($data['category_id']);
        jsonResponse($result ? ['message' => 'Xóa thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
    }
}