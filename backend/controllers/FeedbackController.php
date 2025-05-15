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
        $feedbacks = $feedbackModel->getAll();
        jsonResponse($feedbacks);
        break;

    case 'POST':
        // Kiểm tra file đính kèm
        $attachmentUrl = null;
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
            $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            $maxSize = 5 * 1024 * 1024; // 5MB
            $file = $_FILES['attachment'];

            if (!in_array($file['type'], $allowedTypes)) {
                jsonResponse(['error' => 'Loại tệp không được phép. Chỉ chấp nhận JPG, PNG, PDF.'], 400);
            }
            if ($file['size'] > $maxSize) {
                jsonResponse(['error' => 'Tệp quá lớn. Kích thước tối đa là 5MB.'], 400);
            }

            $uploadDir = __DIR__ . '/../uploads/feedback/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $fileName = uniqid() . '-' . basename($file['name']);
            $filePath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                $attachmentUrl = '/uploads/feedback/' . $fileName;
            } else {
                jsonResponse(['error' => 'Không thể tải lên tệp'], 500);
            }
        }

        // Xử lý dữ liệu form
        if (!isset($_POST['feedback_message'])) {
            jsonResponse(['error' => 'Thiếu nội dung phản hồi'], 400);
        }

        $feedbackData = [
            'user_id' => $_POST['user_id'] ?? null,
            'feedback_message' => $_POST['feedback_message'],
            'feedback_url' => $_POST['feedback_url'] ?? null,
            'feedback_attachment_url' => $attachmentUrl
        ];

        $result = $feedbackModel->create($feedbackData);
        jsonResponse($result ? ['message' => 'Gửi phản hồi thành công'] : ['error' => 'Thêm thất bại'], $result ? 200 : 500);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true); // Sử dụng json_decode thay vì parse_str
        if (!isset($data['feedback_id'])) {
            jsonResponse(['error' => 'Thiếu feedback_id'], 400);
        }
        $result = $feedbackModel->delete($data['feedback_id']);
        jsonResponse($result ? ['message' => 'Xóa phản hồi thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
        break;

    default:
        jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
}