<?php
// 📁 backend/models/Category.php

class Category {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM category ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM category WHERE category_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO category (category_name, category_description, category_origin, category_type) VALUES (:name, :desc, :origin, :type)");
        return $stmt->execute([
            ':name' => htmlspecialchars(strip_tags(trim($data['category_name']))),
            ':desc' => htmlspecialchars(strip_tags(trim($data['category_description'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['category_origin'] ?? ''))),
            ':type' => $data['category_type']
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE category SET category_name = :name, category_description = :desc, category_origin = :origin, category_type = :type WHERE category_id = :id");
        return $stmt->execute([
            ':id' => $data['category_id'],
            ':name' => htmlspecialchars(strip_tags(trim($data['category_name'] ?? ''))),
            ':desc' => htmlspecialchars(strip_tags(trim($data['category_description'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['category_origin'] ?? ''))),
            ':type' => $data['category_type']
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM category WHERE category_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
