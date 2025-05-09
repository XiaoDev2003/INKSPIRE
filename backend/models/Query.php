<?php
// 📁 backend/models/Query.php

class Query {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT * FROM queries ORDER BY added_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM queries WHERE query_id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO queries (question, short_answer, answer_url, added_by) VALUES (:question, :short, :url, :added_by)");
        return $stmt->execute([
            ':question' => htmlspecialchars(strip_tags(trim($data['question']))),
            ':short' => htmlspecialchars(strip_tags(trim($data['short_answer']))),
            ':url' => htmlspecialchars(strip_tags(trim($data['answer_url']))),
            ':added_by' => $data['added_by']
        ]);
    }

    public function update($data) {
        $stmt = $this->conn->prepare("UPDATE queries SET question = :question, short_answer = :short, answer_url = :url WHERE query_id = :id");
        return $stmt->execute([
            ':id' => $data['query_id'],
            ':question' => htmlspecialchars(strip_tags(trim($data['question'] ?? ''))),
            ':short' => htmlspecialchars(strip_tags(trim($data['short_answer'] ?? ''))),
            ':url' => htmlspecialchars(strip_tags(trim($data['answer_url'] ?? '')))
        ]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM queries WHERE query_id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
