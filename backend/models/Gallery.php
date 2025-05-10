<?php
// 📁 backend/models/Gallery.php

class Gallery {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT 
            g.*, 
            i.item_name, i.script_type, i.item_description, i.author_id,
            u.username AS author_name
        FROM gallery g
        JOIN item i ON g.item_id = i.item_id
        LEFT JOIN users u ON i.author_id = u.user_id
        ORDER BY g.upload_date DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM gallery WHERE gallery_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO gallery (title, image_url, category_id, item_id, uploaded_by) VALUES (:title, :url, :cat, :item, :by)");
        return $stmt->execute([
            ':title' => htmlspecialchars(strip_tags(trim($data['title']))),
            ':url' => htmlspecialchars(strip_tags(trim($data['image_url']))),
            ':cat' => $data['category_id'],
            ':item' => $data['item_id'],
            ':by' => $data['uploaded_by'] ?? null
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM gallery WHERE gallery_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
