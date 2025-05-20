<?php
// 📁 backend/models/Query.php
class Query {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function getLastInsertId() {
        return $this->conn->lastInsertId();
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM queries_link ORDER BY added_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM queries_link WHERE query_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO queries_link (question_content, short_answer, full_answer, added_at, updated_at) VALUES (:question, :short, :full, NOW(), NOW())");
        return $stmt->execute([
            ':question' => htmlspecialchars(strip_tags(trim($data['question_content']))),
            ':short' => htmlspecialchars(strip_tags(trim($data['short_answer']))),
            ':full' => htmlspecialchars(strip_tags(trim($data['full_answer']))),
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE queries_link SET question_content = :question, short_answer = :short, full_answer = :full, updated_at = NOW() WHERE query_id = :id");
        return $stmt->execute([
            ':id' => $data['query_id'],
            ':question' => htmlspecialchars(strip_tags(trim($data['question_content'] ?? ''))),
            ':short' => htmlspecialchars(strip_tags(trim($data['short_answer'] ?? ''))),
            ':full' => htmlspecialchars(strip_tags(trim($data['full_answer'] ?? '')))
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM queries_link WHERE query_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}