<?php
// 📁 backend/models/Gallery.php

class Gallery {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT 
            g.image_id, g.image_title, g.image_description, g.image_url, g.category_id, g.item_id, g.uploaded_by, g.upload_date, g.status,
            c.category_name,
            i.item_name,
            u.username AS uploaded_by_name
        FROM gallery g
        LEFT JOIN categories c ON g.category_id = c.category_id
        LEFT JOIN items i ON g.item_id = i.item_id
        LEFT JOIN users u ON g.uploaded_by = u.user_id
        ORDER BY g.upload_date DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT 
            g.image_id, g.image_title, g.image_description, g.image_url, g.category_id, g.item_id, g.uploaded_by, g.upload_date, g.status,
            c.category_name,
            i.item_name,
            u.username AS uploaded_by_name
        FROM gallery g
        LEFT JOIN categories c ON g.category_id = c.category_id
        LEFT JOIN items i ON g.item_id = i.item_id
        LEFT JOIN users u ON g.uploaded_by = u.user_id
        WHERE g.image_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO gallery (image_title, image_description, image_url, category_id, item_id, uploaded_by, status) VALUES (:title, :description, :url, :cat, :item, :by, :status)");
        $success = $stmt->execute([
            ':title' => htmlspecialchars(strip_tags(trim($data['image_title']))),
            ':description' => isset($data['image_description']) ? htmlspecialchars(strip_tags($data['image_description'])) : null,
            ':url' => htmlspecialchars(strip_tags(trim($data['image_url']))),
            ':cat' => $data['category_id'] ?? null,
            ':item' => $data['item_id'] ?? null,
            ':by' => $data['uploaded_by'], // Sử dụng user_id được gửi từ client
            ':status' => $data['status'] ?? 'draft'
        ]);
        if ($success) {
            $newId = $this->conn->lastInsertId();
            return $this->getById($newId);
        }
        return false;
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE gallery SET image_title = :title, image_description = :description, image_url = :url, category_id = :cat, item_id = :item, status = :status WHERE image_id = :id");
        $success = $stmt->execute([
            ':id' => $data['image_id'],
            ':title' => htmlspecialchars(strip_tags(trim($data['image_title']))),
            ':description' => isset($data['image_description']) ? htmlspecialchars(strip_tags($data['image_description'])) : null,
            ':url' => htmlspecialchars(strip_tags(trim($data['image_url']))),
            ':cat' => $data['category_id'] ?? null,
            ':item' => $data['item_id'] ?? null,
            ':status' => $data['status'] ?? 'draft'
        ]);
        if ($success) {
            return $this->getById($data['image_id']);
        }
        return false;
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM gallery WHERE image_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}