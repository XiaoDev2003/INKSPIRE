<?php
require_once __DIR__ . '/../config/db.php';

class CommentReaction {
    private $conn;

    public function __construct($db = null) {
        if ($db) {
            $this->conn = $db;
        } else {
            $database = new Database();
            $this->conn = $database->getConnection();
        }
    }

    // Lấy phản ứng của người dùng đối với một bình luận
    public function getUserReaction($user_id, $comment_id) {
        $sql = "SELECT * FROM comment_reactions WHERE user_id = :user_id AND comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->bindValue(':comment_id', $comment_id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Thêm phản ứng mới
    public function addReaction($data) {
        $sql = "INSERT INTO comment_reactions (user_id, comment_id, reaction_type) 
                VALUES (:user_id, :comment_id, :reaction_type)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':user_id', $data['user_id']);
        $stmt->bindValue(':comment_id', $data['comment_id']);
        $stmt->bindValue(':reaction_type', $data['reaction_type']);

        return $stmt->execute();
    }

    // Cập nhật phản ứng
    public function updateReaction($user_id, $comment_id, $reaction_type) {
        $sql = "UPDATE comment_reactions SET reaction_type = :reaction_type 
                WHERE user_id = :user_id AND comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':reaction_type', $reaction_type);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->bindValue(':comment_id', $comment_id);

        return $stmt->execute();
    }

    // Xóa phản ứng
    public function deleteReaction($user_id, $comment_id) {
        $sql = "DELETE FROM comment_reactions WHERE user_id = :user_id AND comment_id = :comment_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->bindValue(':comment_id', $comment_id);

        return $stmt->execute();
    }

    // Lấy tổng số lượt thích cho một bình luận
    public function getLikesCount($comment_id) {
        $sql = "SELECT COUNT(*) as count FROM comment_reactions 
                WHERE comment_id = :comment_id AND reaction_type = 'like'";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':comment_id', $comment_id);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    // Lấy tổng số lượt không thích cho một bình luận
    public function getDislikesCount($comment_id) {
        $sql = "SELECT COUNT(*) as count FROM comment_reactions 
                WHERE comment_id = :comment_id AND reaction_type = 'dislike'";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':comment_id', $comment_id);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
}