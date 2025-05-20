<?php
// 📁 backend/controllers/FeedbackController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Feedback.php';
require_once __DIR__ . '/../utils/helpers.php';

class FeedbackController {
    private $feedbackModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->feedbackModel = new Feedback($conn);
    }

    // Phương thức handleRequest đã được loại bỏ để tuân theo mẫu OOP nhất quán
    // Các phương thức riêng lẻ sẽ được gọi trực tiếp từ routes/api.php

    public function getFeedbacks() {
        $feedbacks = $this->feedbackModel->getAll();
        jsonResponse($feedbacks);
    }

    public function createFeedback() {
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
            'user_id' => isset($_POST['user_id']) && !empty($_POST['user_id']) ? $_POST['user_id'] : null,
            'feedback_message' => $_POST['feedback_message'],
            'feedback_url' => $_POST['feedback_url'] ?? null,
            'feedback_attachment_url' => $attachmentUrl
        ];

        $result = $this->feedbackModel->create($feedbackData);
        jsonResponse($result ? 
            ['message' => 'Gửi phản hồi thành công', 'feedback_id' => $this->feedbackModel->getLastInsertId()] : 
            ['error' => 'Thêm thất bại'], 
            $result ? 200 : 500);
    }

    public function deleteFeedback() {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['feedback_id'])) {
            jsonResponse(['error' => 'Thiếu feedback_id'], 400);
        }
        $result = $this->feedbackModel->delete($data['feedback_id']);
        jsonResponse($result ? ['message' => 'Xóa phản hồi thành công'] : ['error' => 'Xóa thất bại'], $result ? 200 : 500);
    }
}