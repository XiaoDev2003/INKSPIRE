<?php
// 📁 backend/models/Auth.php


class Auth {
    private $conn;
    private $lastError;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function findByEmail($email) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findById($userId) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE user_id = :user_id");
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function registerUser($username, $email, $passwordHash) {
        try {
            $stmt = $this->conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :hash)");
            return $stmt->execute([
                ':username' => $username,
                ':email' => $email,
                ':hash' => $passwordHash
            ]);
        } catch (PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("DB Error: " . $this->lastError);
            return false;
        }
    }

    public function verifyLogin($login, $password) {
        // Cho phép đăng nhập bằng email hoặc username
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = :login OR username = :login");
        $stmt->execute([':login' => $login]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && isset($user['password_hash']) && password_verify($password, $user['password_hash'])) {
            return $user;
        }
        return false;
    }

    public function isAdmin($userId) {
        $stmt = $this->conn->prepare("SELECT role FROM users WHERE user_id = :user_id");
        $stmt->execute([':user_id' => $userId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return ($result && $result['role'] === 'admin');
    }

    public function lastError() {
        return $this->lastError;
    }
}
