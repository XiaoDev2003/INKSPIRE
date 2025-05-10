<?php
// 📁 backend/models/Feedback.php

class Feedback {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query(
            "SELECT f.*, u.username 
             FROM feedback f 
             LEFT JOIN users u ON f.user_id = u.user_id 
             ORDER BY submitted_at DESC"
        );
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare(
            "INSERT INTO feedback (user_id, feedback_message, feedback_url, feedback_attachment_url) 
             VALUES (:user_id, :feedback_message, :feedback_url, :feedback_attachment_url)"
        );
        return $stmt->execute([
            ':user_id' => $data['user_id'],
            ':feedback_message' => htmlspecialchars(strip_tags(trim($data['feedback_message']))),
            ':feedback_url' => $data['feedback_url'],
            ':feedback_attachment_url' => $data['feedback_attachment_url']
        ]);
    }

    public function delete($id) {
        // Xóa file đính kèm nếu có
        $stmt = $this->conn->prepare("SELECT feedback_attachment_url FROM feedback WHERE feedback_id = :id");
        $stmt->execute([':id' => $id]);
        $feedback = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($feedback && $feedback['feedback_attachment_url']) {
            $filePath = __DIR__ . '/../..' . $feedback['feedback_attachment_url'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        $stmt = $this->conn->prepare("DELETE FROM feedback WHERE feedback_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
?>