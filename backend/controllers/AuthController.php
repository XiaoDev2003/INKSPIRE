<?php
// 📁 backend/controllers/AuthController.php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../models/Auth.php';
require_once __DIR__ . '/../utils/helpers.php';

class AuthController {
    private $authModel;

    public function __construct() {
        $conn = (new Database())->getConnection();
        $this->authModel = new Auth($conn);
    }

    public function register() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Only POST allowed'], 405);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['username'], $data['email'], $data['password'])) {
            jsonResponse(['error' => 'Missing fields'], 400);
        }

        $username = sanitizeInput($data['username']);
        $email = sanitizeInput($data['email']);
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

        if ($this->authModel->findByEmail($email)) {
            jsonResponse(['error' => 'Email already registered'], 409);
        }

        $success = $this->authModel->registerUser($username, $email, $passwordHash);

        if (!$success) {
            // Debug lỗi SQL nếu có
            error_log("\n\nRegister failed: " . json_encode($this->authModel->lastError()), 3, __DIR__ . '/../logs/error.log');
        }

        jsonResponse($success ? ['message' => 'User registered successfully'] : ['error' => 'Registration failed'], $success ? 200 : 500);
    }

    public function login() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonResponse(['error' => 'Only POST allowed'], 405);
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email'], $data['password'])) {
            jsonResponse(['error' => 'Missing fields'], 400);
        }

        $email = sanitizeInput($data['email']);
        $user = $this->authModel->findByEmail($email);

        if ($user && isset($user['password_hash']) && password_verify($data['password'], $user['password_hash'])) {
            unset($user['password_hash']);
            jsonResponse($user);
        } else {
            jsonResponse(['error' => 'Invalid credentials'], 401);
        }
    }
}