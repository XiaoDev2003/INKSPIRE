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

    public function lastError() {
        return $this->lastError;
    }
}
