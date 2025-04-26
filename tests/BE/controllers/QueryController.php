<?php
// 📁 backend/controllers/QueryController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Query.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$queryModel = new Query($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['query_id'])) {
            $query = $queryModel->getById($_GET['query_id']);
            jsonResponse($query ?: ['error' => 'Không tìm thấy'], $query ? 200 : 404);
        } else {
            $queries = $queryModel->getAll();
            jsonResponse($queries);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['question'], $data['short_answer'], $data['answer_url'], $data['added_by'])) {
            jsonResponse(['error' => 'Thiếu thông tin câu hỏi'], 400);
        }
        $result = $queryModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm câu hỏi thành công'] : ['error' => 'Thêm thất bại'], $result ? 200 : 500);
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        if (!isset($data['query_id'])) {
            jsonResponse(['error' => 'Thiếu query_id'], 400);
        }
        $result = $queryModel->update($data);
        jsonResponse($result ? ['message' => 'Cập nhật thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $data);
        if (!isset($data['query_id'])) {
            jsonResponse(['error' => 'Thiếu query_id'], 400);
        }
        $result = $queryModel->delete($data['query_id']);
        jsonResponse($result ? ['message' => 'Xoá thành công'] : ['error' => 'Xoá thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}
