<?php
// 📁 backend/models/Item.php

class Item {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM item ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM item WHERE item_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO item (item_name, category_id, script_type, item_description, author_id) VALUES (:name, :cat, :script, :desc, :author)");
        return $stmt->execute([
            ':name' => htmlspecialchars(strip_tags(trim($data['item_name']))),
            ':cat' => $data['category_id'],
            ':script' => $data['script_type'],
            ':desc' => htmlspecialchars(strip_tags(trim($data['item_description'] ?? ''))),
            ':author' => $data['author_id']
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE item SET item_name = :name, category_id = :cat, script_type = :script, item_description = :desc, author_id = :author WHERE item_id = :id");
        return $stmt->execute([
            ':id' => $data['item_id'],
            ':name' => htmlspecialchars(strip_tags(trim($data['item_name'] ?? ''))),
            ':cat' => $data['category_id'],
            ':script' => $data['script_type'],
            ':desc' => htmlspecialchars(strip_tags(trim($data['item_description'] ?? ''))),
            ':author' => $data['author_id']
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM item WHERE item_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
