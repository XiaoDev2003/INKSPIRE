<?php
// 📁 backend/controllers/CommentsController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Comment.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$commentModel = new Comment($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $item_id = isset($_GET['item_id']) ? (int)$_GET['item_id'] : null;
        $category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
        $comments = $commentModel->getAll($item_id, $category_id);
        jsonResponse($comments);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['comment_content']) || empty(trim($data['comment_content']))) {
            jsonResponse(['error' => 'Nội dung bình luận không được để trống'], 400);
        }
        if (!isset($data['user_id'])) {
            jsonResponse(['error' => 'Thiếu user_id'], 400);
        }
        $result = $commentModel->create($data);
        jsonResponse($result ? ['message' => 'Thêm bình luận thành công'] : ['error' => 'Thêm bình luận thất bại'], $result ? 201 : 500);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['comment_id'])) {
            jsonResponse(['error' => 'Thiếu comment_id'], 400);
        }
        if (!isset($data['comment_content'])) {
            jsonResponse(['error' => 'Thiếu nội dung bình luận'], 400);
        }
        $result = $commentModel->update($data['comment_id'], $data);
        jsonResponse($result ? ['message' => 'Cập nhật bình luận thành công'] : ['error' => 'Cập nhật thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['comment_id'])) {
            jsonResponse(['error' => 'Thiếu comment_id'], 400);
        }
        $result = $commentModel->delete($data['comment_id']);
        jsonResponse($result ? ['message' => 'Xóa bình luận thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}
?>