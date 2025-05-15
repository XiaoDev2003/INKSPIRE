<?php
// 📁 backend/models/User.php

class User {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT user_id, username, email, phone, role, gender, first_name, last_name, status, created_at FROM users ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT user_id, username, email, phone, role, gender, first_name, last_name, status, created_at FROM users WHERE user_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO users (username, email, phone, role, gender, first_name, last_name, status, password_hash) VALUES (:username, :email, :phone, :role, :gender, :first_name, :last_name, :status, :password_hash)");
        return $stmt->execute([
            ':username' => htmlspecialchars(strip_tags(trim($data['username']))),
            ':email' => htmlspecialchars(strip_tags(trim($data['email']))),
            ':phone' => htmlspecialchars(strip_tags(trim($data['phone'] ?? ''))),
            ':role' => $data['role'] ?? 'user',
            ':gender' => $data['gender'] ?? 'other',
            ':first_name' => htmlspecialchars(strip_tags(trim($data['first_name'] ?? ''))),
            ':last_name' => htmlspecialchars(strip_tags(trim($data['last_name'] ?? ''))),
            ':status' => $data['status'] ?? 'active',
            ':password_hash' => password_hash('default_password', PASSWORD_DEFAULT) // Mật khẩu mặc định, có thể yêu cầu người dùng đổi sau
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE users SET username = :username, email = :email, phone = :phone, role = :role, gender = :gender, first_name = :first_name, last_name = :last_name, status = :status WHERE user_id = :id");
        return $stmt->execute([
            ':id' => $data['user_id'],
            ':username' => htmlspecialchars(strip_tags(trim($data['username'] ?? ''))),
            ':email' => htmlspecialchars(strip_tags(trim($data['email'] ?? ''))),
            ':phone' => htmlspecialchars(strip_tags(trim($data['phone'] ?? ''))),
            ':role' => $data['role'] ?? 'user',
            ':gender' => $data['gender'] ?? 'other',
            ':first_name' => htmlspecialchars(strip_tags(trim($data['first_name'] ?? ''))),
            ':last_name' => htmlspecialchars(strip_tags(trim($data['last_name'] ?? ''))),
            ':status' => $data['status'] ?? 'active'
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM users WHERE user_id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function updateStatus($id, $status) {
        $stmt = $this->conn->prepare("UPDATE users SET status = :status WHERE user_id = :id");
        return $stmt->execute([
            ':id' => $id,
            ':status' => $status
        ]);
    }

    public function findByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}