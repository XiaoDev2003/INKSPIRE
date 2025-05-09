<?php
// 📁 backend/controllers/FeedbackController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Feedback.php';
require_once __DIR__ . '/../utils/helpers.php';

$db = new Database();
$conn = $db->getConnection();
$feedbackModel = new Feedback($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['item_id'])) {
            $feedbacks = $feedbackModel->getByItem($_GET['item_id']);
        } else {
            $feedbacks = $feedbackModel->getAll();
        }
        jsonResponse($feedbacks);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'], $data['item_id'], $data['content'])) {
            jsonResponse(['error' => 'Thiếu thông tin phản hồi'], 400);
        }
        $result = $feedbackModel->create($data);
        jsonResponse($result ? ['message' => 'Gửi phản hồi thành công'] : ['error' => 'Thêm thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $data);
        if (!isset($data['feedback_id'])) {
            jsonResponse(['error' => 'Thiếu feedback_id'], 400);
        }
        $result = $feedbackModel->delete($data['feedback_id']);
        jsonResponse($result ? ['message' => 'Xóa phản hồi thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}
