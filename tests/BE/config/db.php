<?php
class Database {
    private $host = "localhost";
    private $db_name = "calligraphy_website";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};port=3307;dbname={$this->db_name};charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}
