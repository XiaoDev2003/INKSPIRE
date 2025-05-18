<?php
require_once __DIR__ . '/../models/Comment.php';
require_once __DIR__ . '/../models/CommentReaction.php';
require_once __DIR__ . '/../models/User.php';

class CommentController {
    private $commentModel;
    private $reactionModel;
    private $userModel;

    public function __construct() {
        // Khởi tạo kết nối database
        require_once __DIR__ . '/../config/db.php';
        $database = new Database();
        $conn = $database->getConnection();

        // Khởi tạo các model với kết nối database
        $this->commentModel = new Comment();
        $this->reactionModel = new CommentReaction();
        $this->userModel = new User($conn);
    }

    // Lấy danh sách bình luận
    public function getComments() {
        try {
            // Lấy các tham số từ request
            $item_id = isset($_GET['item_id']) ? $_GET['item_id'] : null;
            $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;
            $parent_only = isset($_GET['parent_only']) ? filter_var($_GET['parent_only'], FILTER_VALIDATE_BOOLEAN) : false;
            $current_user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

            // Lấy bình luận từ database
            $comments = $this->commentModel->getComments($item_id, $category_id, $parent_only);

            // Nếu có user_id, lấy thông tin phản ứng của người dùng hiện tại
            if ($current_user_id) {
                foreach ($comments as &$comment) {
                    $reaction = $this->reactionModel->getUserReaction($current_user_id, $comment['comment_id']);
                    $comment['user_reaction'] = $reaction ? $reaction['reaction_type'] : null;
                }
            }

            // Thêm thông tin người dùng vào mỗi bình luận
            foreach ($comments as &$comment) {
                $user = $this->userModel->getUserById($comment['user_id']);
                if ($user) {
                    $comment['username'] = $user['username'];
                    $comment['first_name'] = $user['first_name'];
                    $comment['last_name'] = $user['last_name'];
                    $comment['avatar_url'] = $user['avatar_url'];
                }
            }

            // Trả về kết quả dạng JSON
            header('Content-Type: application/json');
            echo json_encode($comments);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // Thêm bình luận mới
    public function addComment() {
        try {
            // Lấy dữ liệu từ request
            $data = json_decode(file_get_contents('php://input'), true);

            // Kiểm tra dữ liệu
            if (!isset($data['comment_content']) || !isset($data['user_id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Thiếu thông tin bình luận']);
                return;
            }

            // Thêm bình luận vào database
            $comment_id = $this->commentModel->addComment($data);

            if ($comment_id) {
                // Lấy thông tin bình luận vừa thêm
                $comment = $this->commentModel->getCommentById($comment_id);

                // Thêm thông tin người dùng
                $user = $this->userModel->getUserById($comment['user_id']);
                if ($user) {
                    $comment['username'] = $user['username'];
                    $comment['first_name'] = $user['first_name'];
                    $comment['last_name'] = $user['last_name'];
                    $comment['avatar_url'] = $user['avatar_url'];
                }

                header('Content-Type: application/json');
                echo json_encode($comment);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Không thể thêm bình luận']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // Cập nhật bình luận
    public function updateComment($comment_id) {
        try {
            // Lấy dữ liệu từ request
            $data = json_decode(file_get_contents('php://input'), true);

            // Kiểm tra dữ liệu
            if (!isset($data['comment_content'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Thiếu nội dung bình luận']);
                return;
            }

            // Cập nhật bình luận
            $result = $this->commentModel->updateComment($comment_id, $data['comment_content']);

            if ($result) {
                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'message' => 'Cập nhật bình luận thành công']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Không thể cập nhật bình luận']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // Xóa bình luận
    public function deleteComment($comment_id) {
        try {
            // Xóa bình luận
            $result = $this->commentModel->deleteComment($comment_id);

            if ($result) {
                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'message' => 'Xóa bình luận thành công']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Không thể xóa bình luận']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // Thêm hoặc cập nhật phản ứng (like/dislike)
    public function addReaction() {
        try {
            // Lấy dữ liệu từ request
            $data = json_decode(file_get_contents('php://input'), true);

            // Kiểm tra dữ liệu
            if (!isset($data['user_id']) || !isset($data['comment_id']) || !isset($data['reaction_type'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Thiếu thông tin phản ứng']);
                return;
            }

            // Kiểm tra xem người dùng đã có phản ứng trước đó chưa
            $existingReaction = $this->reactionModel->getUserReaction($data['user_id'], $data['comment_id']);

            if ($existingReaction) {
                // Nếu phản ứng mới giống phản ứng cũ, xóa phản ứng (hủy like/dislike)
                if ($existingReaction['reaction_type'] === $data['reaction_type']) {
                    $result = $this->reactionModel->deleteReaction($data['user_id'], $data['comment_id']);

                    // Cập nhật số lượt like/dislike trong bảng comments
                    if ($data['reaction_type'] === 'like') {
                        $this->commentModel->updateLikesCount($data['comment_id'], -1);
                    } else {
                        $this->commentModel->updateDislikesCount($data['comment_id'], -1);
                    }

                    $message = 'Đã hủy phản ứng';
                } else {
                    // Nếu phản ứng mới khác phản ứng cũ, cập nhật phản ứng
                    $result = $this->reactionModel->updateReaction($data['user_id'], $data['comment_id'], $data['reaction_type']);

                    // Cập nhật số lượt like/dislike trong bảng comments
                    if ($data['reaction_type'] === 'like') {
                        $this->commentModel->updateLikesCount($data['comment_id'], 1);
                        $this->commentModel->updateDislikesCount($data['comment_id'], -1);
                    } else {
                        $this->commentModel->updateLikesCount($data['comment_id'], -1);
                        $this->commentModel->updateDislikesCount($data['comment_id'], 1);
                    }

                    $message = 'Đã cập nhật phản ứng';
                }
            } else {
                // Nếu chưa có phản ứng, thêm mới
                $result = $this->reactionModel->addReaction($data);

                // Cập nhật số lượt like/dislike trong bảng comments
                if ($data['reaction_type'] === 'like') {
                    $this->commentModel->updateLikesCount($data['comment_id'], 1);
                } else {
                    $this->commentModel->updateDislikesCount($data['comment_id'], 1);
                }

                $message = 'Đã thêm phản ứng';
            }

            if ($result) {
                // Lấy thông tin bình luận sau khi cập nhật
                $comment = $this->commentModel->getCommentById($data['comment_id']);

                header('Content-Type: application/json');
                echo json_encode([
                    'success' => true,
                    'message' => $message,
                    'comment' => $comment
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Không thể thực hiện phản ứng']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}