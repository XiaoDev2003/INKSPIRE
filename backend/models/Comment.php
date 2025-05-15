<?php
// 📁 backend/models/Comment.php

class Comment {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query(
            "SELECT c.*, u.username, i.item_name 
             FROM comments c 
             LEFT JOIN users u ON c.user_id = u.user_id 
             LEFT JOIN items i ON c.item_id = i.item_id 
             ORDER BY c.created_at DESC"
        );
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $data) {
        $stmt = $this->conn->prepare(
            "UPDATE comments 
             SET comment_content = :comment_content, updated_at = CURRENT_TIMESTAMP 
             WHERE comment_id = :id"
        );
        return $stmt->execute([
            ':id' => $id,
            ':comment_content' => htmlspecialchars(strip_tags(trim($data['comment_content']))),
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM comments WHERE comment_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
?>