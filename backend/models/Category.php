<?php
// 📁 backend/models/Category.php

class Category {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function getLastInsertId() {
        return $this->conn->lastInsertId();
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM categories"); // Bỏ ORDER BY created_at DESC
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM categories WHERE category_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO categories (category_name, category_des, category_origin, category_type, status) VALUES (:name, :desc, :origin, :type, :status)");
        return $stmt->execute([
            ':name' => htmlspecialchars(strip_tags(trim($data['category_name']))),
            ':desc' => htmlspecialchars(strip_tags(trim($data['category_des'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['category_origin'] ?? ''))),
            ':type' => $data['category_type'],
            ':status' => $data['status'] ?? 'draft'
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE categories SET category_name = :name, category_des = :desc, category_origin = :origin, category_type = :type, status = :status WHERE category_id = :id");
        return $stmt->execute([
            ':id' => $data['category_id'],
            ':name' => htmlspecialchars(strip_tags(trim($data['category_name'] ?? ''))),
            ':desc' => htmlspecialchars(strip_tags(trim($data['category_des'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['category_origin'] ?? ''))),
            ':type' => $data['category_type'],
            ':status' => $data['status'] ?? 'draft'
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM categories WHERE category_id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function updateStatus($id, $status) {
        $stmt = $this->conn->prepare("UPDATE categories SET status = :status WHERE category_id = :id");
        return $stmt->execute([
            ':id' => $id,
            ':status' => $status
        ]);
    }
}