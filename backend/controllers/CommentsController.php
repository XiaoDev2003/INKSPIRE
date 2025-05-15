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
        $comments = $commentModel->getAll();
        jsonResponse($comments);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true); // Sử dụng json_decode thay vì parse_str
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
        $data = json_decode(file_get_contents("php://input"), true); // Sử dụng json_decode thay vì parse_str
        if (!isset($data['comment_id'])) {
            jsonResponse(['error' => 'Thiếu comment_id'], 400);
        }
        $result = $commentModel->delete($data['comment_id']);
        jsonResponse($result ? ['message' => 'Xóa bình luận thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}