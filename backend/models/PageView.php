<?php
require_once __DIR__ . '/../config/db.php';

class PageView {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Lấy thông tin lượt truy cập theo ID
    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM page_views WHERE view_id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Lấy tất cả các bộ đếm lượt truy cập
    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM page_views ORDER BY view_id ASC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Tăng số lượt truy cập
    public function incrementViews($id) {
        $stmt = $this->conn->prepare("UPDATE page_views SET total_views = total_views + 1 WHERE view_id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Tạo bộ đếm lượt truy cập mới
    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO page_views (content, total_views) VALUES (:content, :total_views)");
        return $stmt->execute([
            ':content' => htmlspecialchars(strip_tags(trim($data['content'] ?? ''))),
            ':total_views' => $data['total_views'] ?? 0
        ]);
    }

    // Cập nhật bộ đếm lượt truy cập
    public function update($id, $data) {
        $stmt = $this->conn->prepare("UPDATE page_views SET content = :content, total_views = :total_views WHERE view_id = :id");
        return $stmt->execute([
            ':id' => $id,
            ':content' => htmlspecialchars(strip_tags(trim($data['content'] ?? ''))),
            ':total_views' => $data['total_views'] ?? 0
        ]);
    }

    // Xóa bộ đếm lượt truy cập
    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM page_views WHERE view_id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    // Kiểm tra xem bộ đếm có tồn tại không
    public function exists($id) {
        $stmt = $this->conn->prepare("SELECT COUNT(*) FROM page_views WHERE view_id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    }

    // Khởi tạo bộ đếm mặc định nếu chưa tồn tại
    public function initDefaultCounter() {
        if (!$this->exists(1)) {
            $this->create([
                'content' => 'Lượt truy cập trang web',
                'total_views' => 0
            ]);
        }
        return $this->getById(1);
    }
}