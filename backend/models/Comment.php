<?php
// 📁 backend/models/Comment.php
require_once __DIR__ . '/../config/db.php';

class Comment {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Lấy danh sách bình luận
    public function getComments($item_id = null, $category_id = null, $parent_only = false, $sort_field = 'created_at', $sort_direction = 'desc') {
        try {
            $query = "SELECT c.*, u.username, u.first_name, u.last_name, i.item_name,
                      (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.comment_id AND reaction_type = 'like') as likes_count,
                      (SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.comment_id AND reaction_type = 'dislike') as dislikes_count
                      FROM comments c 
                      LEFT JOIN users u ON c.user_id = u.user_id 
                      LEFT JOIN items i ON c.item_id = i.item_id 
                      WHERE 1=1";
            $params = [];

            if ($item_id) {
                $query .= " AND c.item_id = :item_id";
                $params[':item_id'] = $item_id;
            }
            if ($category_id) {
                $query .= " AND c.category_id = :category_id";
                $params[':category_id'] = $category_id;
            }
            if ($parent_only) {
                $query .= " AND c.parent_comment_id IS NULL";
            }

            // Xác định trường sắp xếp và hướng sắp xếp
            $allowed_fields = ['created_at', 'likes_count', 'dislikes_count'];
            $sort_field = in_array($sort_field, $allowed_fields) ? $sort_field : 'created_at';
            $sort_direction = strtoupper($sort_direction) === 'ASC' ? 'ASC' : 'DESC';

            // Sắp xếp theo trường thích hợp (lưu ý likes_count và dislikes_count là alias từ subquery)
            if ($sort_field === 'created_at') {
                $query .= " ORDER BY c.created_at {$sort_direction}";
            } else {
                $query .= " ORDER BY {$sort_field} {$sort_direction}, c.created_at DESC";
            }

            // Debug: Ghi log câu truy vấn
            error_log('Comment Model - Query: ' . $query);
            error_log('Comment Model - Params: ' . print_r($params, true));

            $stmt = $this->conn->prepare($query);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Đảm bảo luôn trả về mảng, ngay cả khi không có kết quả
            if ($result === false) {
                error_log('Comment Model - fetchAll() trả về false');
                return [];
            }

            return $result;
        } catch (PDOException $e) {
            error_log('Comment Model Exception: ' . $e->getMessage());
            return [];
        }
    }

    // Tương thích với phương thức cũ
    public function getAll($item_id = null, $category_id = null) {
        return $this->getComments($item_id, $category_id);
    }

    // Lấy thông tin một bình luận theo ID
    public function getCommentById($comment_id) {
        $sql = "SELECT c.*, u.username, u.first_name, u.last_name, i.item_name 
               FROM comments c 
               LEFT JOIN users u ON c.user_id = u.user_id 
               LEFT JOIN items i ON c.item_id = i.item_id 
               WHERE c.comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':comment_id', $comment_id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->conn->prepare(
            "INSERT INTO comments (comment_content, user_id, item_id, category_id, parent_comment_id, created_at, updated_at) 
             VALUES (:comment_content, :user_id, :item_id, :category_id, :parent_comment_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
        );
        $result = $stmt->execute([
            ':comment_content' => htmlspecialchars(strip_tags(trim($data['comment_content']))),
            ':user_id' => $data['user_id'],
            ':item_id' => $data['item_id'] ?? null,
            ':category_id' => $data['category_id'] ?? null,
            ':parent_comment_id' => $data['parent_comment_id'] ?? null,
        ]);

        if ($result) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    // Thêm bình luận mới (tương thích với CommentController mới)
    public function addComment($data) {
        return $this->create($data);
    }

    public function update($id, $data) {
        $stmt = $this->conn->prepare(
            "UPDATE comments 
             SET comment_content = :comment_content, updated_at = CURRENT_TIMESTAMP 
             WHERE comment_id = :id"
        );
        return $stmt->execute([
            ':id' => $id,
            ':comment_content' => htmlspecialchars(strip_tags(trim($data['comment_content']))),
        ]);
    }

    // Cập nhật bình luận (tương thích với CommentController mới)
    public function updateComment($comment_id, $comment_content) {
        return $this->update($comment_id, ['comment_content' => $comment_content]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM comments WHERE comment_id = :id");
        return $stmt->execute([':id' => $id]);
    }

    // Xóa bình luận (tương thích với CommentController mới)
    public function deleteComment($comment_id) {
        return $this->delete($comment_id);
    }

    // Cập nhật số lượt thích
    public function updateLikesCount($comment_id, $change) {
        $sql = "UPDATE comments SET likes_count = likes_count + :change WHERE comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':change', $change);
        $stmt->bindValue(':comment_id', $comment_id);

        return $stmt->execute();
    }

    // Cập nhật số lượt không thích
    public function updateDislikesCount($comment_id, $change) {
        $sql = "UPDATE comments SET dislikes_count = dislikes_count + :change WHERE comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':change', $change);
        $stmt->bindValue(':comment_id', $comment_id);

        return $stmt->execute();
    }
}
?>