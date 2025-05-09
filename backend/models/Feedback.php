<?php
// 📁 backend/models/Feedback.php

class Feedback {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT f.*, u.username FROM feedback f JOIN users u ON f.user_id = u.user_id ORDER BY submitted_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByItem($item_id) {
        $stmt = $this->conn->prepare("SELECT f.*, u.username FROM feedback f JOIN users u ON f.user_id = u.user_id WHERE f.item_id = :item_id ORDER BY submitted_at DESC");
        $stmt->execute([':item_id' => $item_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO feedback (user_id, item_id, content) VALUES (:user_id, :item_id, :content)");
        return $stmt->execute([
            ':user_id' => $data['user_id'],
            ':item_id' => $data['item_id'],
            ':content' => htmlspecialchars(strip_tags(trim($data['content'])))
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM feedback WHERE feedback_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
