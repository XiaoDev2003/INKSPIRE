<?php
// 📁 backend/models/Item.php

class Item {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($page = 1, $limit = 20) {
        // Tính offset cho phân trang
        $offset = ($page - 1) * $limit;

        $stmt = $this->conn->prepare("SELECT 
            i.item_id, i.item_name, i.category_id, i.item_des, i.item_origin, i.lang_type, i.item_url, 
            i.author_id, i.views, i.status, i.created_at, i.updated_at,
            c.category_name,
            u.username AS author_name
        FROM items i
        LEFT JOIN categories c ON i.category_id = c.category_id
        LEFT JOIN users u ON i.author_id = u.user_id
        ORDER BY i.created_at DESC
        LIMIT :limit OFFSET :offset");

        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTotalCount() {
        $stmt = $this->conn->query("SELECT COUNT(*) FROM items");
        return $stmt->fetchColumn();
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT 
            i.item_id, i.item_name, i.category_id, i.item_des, i.item_origin, i.lang_type, i.item_url, 
            i.author_id, i.views, i.status, i.created_at, i.updated_at,
            c.category_name,
            u.username AS author_name
        FROM items i
        LEFT JOIN categories c ON i.category_id = c.category_id
        LEFT JOIN users u ON i.author_id = u.user_id
        WHERE i.item_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO items (item_name, category_id, item_des, item_origin, lang_type, item_url, status, author_id, views, created_at) VALUES (:name, :cat, :des, :origin, :lang, :url, :status, :author, :views, :created)");
        $success = $stmt->execute([
            ':name' => htmlspecialchars(strip_tags(trim($data['item_name']))),
            ':cat' => $data['category_id'] ?? null,
            ':des' => htmlspecialchars(strip_tags(trim($data['item_des'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['item_origin'] ?? ''))),
            ':lang' => htmlspecialchars(strip_tags(trim($data['lang_type'] ?? ''))),
            ':url' => htmlspecialchars(strip_tags(trim($data['item_url'] ?? ''))),
            ':status' => $data['status'] ?? 'draft',
            ':author' => $data['author_id'] ?? 1, // Mặc định author_id = 1 nếu không có session
            ':views' => $data['views'] ?? 0,
            ':created' => date('Y-m-d H:i:s')
        ]);
        if ($success) {
            $newId = $this->conn->lastInsertId();
            return $this->getById($newId);
        }
        return false;
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE items SET item_name = :name, category_id = :cat, item_des = :des, item_origin = :origin, lang_type = :lang, item_url = :url, status = :status, author_id = :author, views = :views, updated_at = :updated WHERE item_id = :id");
        $success = $stmt->execute([
            ':id' => $data['item_id'],
            ':name' => htmlspecialchars(strip_tags(trim($data['item_name'] ?? ''))),
            ':cat' => $data['category_id'] ?? null,
            ':des' => htmlspecialchars(strip_tags(trim($data['item_des'] ?? ''))),
            ':origin' => htmlspecialchars(strip_tags(trim($data['item_origin'] ?? ''))),
            ':lang' => htmlspecialchars(strip_tags(trim($data['lang_type'] ?? ''))),
            ':url' => htmlspecialchars(strip_tags(trim($data['item_url'] ?? ''))),
            ':status' => $data['status'] ?? 'draft',
            ':author' => $data['author_id'] ?? 1,
            ':views' => $data['views'] ?? 0,
            ':updated' => date('Y-m-d H:i:s')
        ]);
        if ($success) {
            return $this->getById($data['item_id']);
        }
        return false;
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM items WHERE item_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}