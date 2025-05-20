<?php
// 📁 backend/controllers/QueryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Query.php';
require_once __DIR__ . '/../utils/helpers.php';

class QueryController {
    private $queryModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->queryModel = new Query($conn);
    }

    // Phương thức handleRequest đã được loại bỏ để tuân theo mẫu OOP nhất quán
    // Các phương thức riêng lẻ sẽ được gọi trực tiếp từ routes/api.php

    public function getQueries() {
        if (isset($_GET['query_id'])) {
            $query = $this->queryModel->getById($_GET['query_id']);
            jsonResponse($query ?: ['error' => 'Không tìm thấy'], $query ? 200 : 404);
        } else {
            $queries = $this->queryModel->getAll();
            jsonResponse($queries);
        }
    }

    public function createQuery() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['question_content'], $data['short_answer'], $data['full_answer'])) {
            jsonResponse(['error' => 'Thiếu thông tin câu hỏi'], 400);
        }
        $result = $this->queryModel->create($data);
        jsonResponse($result ? 
            ['message' => 'Thêm câu hỏi thành công', 'query_id' => $this->queryModel->getLastInsertId()] : 
            ['error' => 'Thêm thất bại'], 
            $result ? 200 : 500);
    }

    public function updateQuery() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['query_id'])) {
            jsonResponse(['error' => 'Thiếu query_id'], 400);
        }
        $result = $this->queryModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
    }

    public function deleteQuery() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['query_id'])) {
            jsonResponse(['error' => 'Thiếu query_id'], 400);
        }
        $result = $this->queryModel->delete($data['query_id']);
        jsonResponse($result ? ['message' => 'Xoá thành công'] : ['error' => 'Xoá thất bại'], $result ? 200 : 500);
    }
}