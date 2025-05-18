<?php
// 📁 backend/models/Comment.php

class Comment {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($item_id = null, $category_id = null) {
        $query = "SELECT c.*, u.username, i.item_name 
                  FROM comments c 
                  LEFT JOIN users u ON c.user_id = u.user_id 
                  LEFT JOIN items i ON c.item_id = i.item_id 
                  WHERE 1=1";
        $params = [];

        if ($item_id) {
            $query .= " AND c.item_id = :item_id";
            $params[':item_id'] = $item_id;
        }
        if ($category_id) {
            $query .= " AND c.category_id = :category_id";
            $params[':category_id'] = $category_id;
        }

        $query .= " ORDER BY c.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare(
            "INSERT INTO comments (comment_content, user_id, item_id, category_id, created_at, updated_at) 
             VALUES (:comment_content, :user_id, :item_id, :category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
        );
        return $stmt->execute([
            ':comment_content' => htmlspecialchars(strip_tags(trim($data['comment_content']))),
            ':user_id' => $data['user_id'],
            ':item_id' => $data['item_id'] ?? null,
            ':category_id' => $data['category_id'] ?? null,
        ]);
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