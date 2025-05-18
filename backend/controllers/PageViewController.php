<?php
require_once __DIR__ . '/../models/PageView.php';

class PageViewController {
    private $pageViewModel;

    public function __construct() {
        $this->pageViewModel = new PageView();
    }

    // API để lấy số lượt truy cập
    public function getPageViews() {
        // Khởi tạo bộ đếm mặc định nếu chưa tồn tại
        $counter = $this->pageViewModel->initDefaultCounter();

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'data' => $counter
        ]);
    }

    // API để tăng số lượt truy cập
    public function incrementPageViews() {
        // Khởi tạo bộ đếm mặc định nếu chưa tồn tại
        $this->pageViewModel->initDefaultCounter();

        // Tăng số lượt truy cập
        $success = $this->pageViewModel->incrementViews(1);
        $counter = $this->pageViewModel->getById(1);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'data' => $counter
        ]);
    }

    // API để lấy tất cả các bộ đếm
    public function getAllCounters() {
        $counters = $this->pageViewModel->getAll();

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'data' => $counters
        ]);
    }

    // API để lấy thông tin bộ đếm theo ID
    public function getCounterById() {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

        if ($id <= 0) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'ID không hợp lệ'
            ]);
            return;
        }

        $counter = $this->pageViewModel->getById($id);

        if (!$counter) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Không tìm thấy bộ đếm'
            ]);
            return;
        }

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'data' => $counter
        ]);
    }

    // API để tạo bộ đếm mới
    public function createCounter() {
        // Lấy dữ liệu từ request
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['content'])) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Thiếu thông tin bắt buộc'
            ]);
            return;
        }

        $success = $this->pageViewModel->create([
            'content' => $data['content'],
            'total_views' => isset($data['total_views']) ? intval($data['total_views']) : 0
        ]);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'message' => $success ? 'Tạo bộ đếm thành công' : 'Tạo bộ đếm thất bại'
        ]);
    }

    // API để cập nhật bộ đếm
    public function updateCounter() {
        // Lấy dữ liệu từ request
        $data = json_decode(file_get_contents('php://input'), true);
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

        if ($id <= 0) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'ID không hợp lệ'
            ]);
            return;
        }

        if (!$this->pageViewModel->exists($id)) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Không tìm thấy bộ đếm'
            ]);
            return;
        }

        $success = $this->pageViewModel->update($id, [
            'content' => $data['content'] ?? '',
            'total_views' => isset($data['total_views']) ? intval($data['total_views']) : 0
        ]);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'message' => $success ? 'Cập nhật bộ đếm thành công' : 'Cập nhật bộ đếm thất bại'
        ]);
    }

    // API để xóa bộ đếm
    public function deleteCounter() {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

        if ($id <= 0) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'ID không hợp lệ'
            ]);
            return;
        }

        // Không cho phép xóa bộ đếm mặc định (ID = 1)
        if ($id === 1) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Không thể xóa bộ đếm mặc định'
            ]);
            return;
        }

        if (!$this->pageViewModel->exists($id)) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Không tìm thấy bộ đếm'
            ]);
            return;
        }

        $success = $this->pageViewModel->delete($id);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'message' => $success ? 'Xóa bộ đếm thành công' : 'Xóa bộ đếm thất bại'
        ]);
    }
}