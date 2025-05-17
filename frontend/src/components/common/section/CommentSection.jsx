import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import axiosClient from '../../../api/axiosClient';

/**
 * Component hiển thị và quản lý bình luận cho các item và danh mục
 * @param {Object} props - Component props
 * @param {string} props.itemId - ID của item (nếu có)
 * @param {string} props.categoryId - ID của danh mục (nếu có)
 */
const CommentSection = ({ itemId, categoryId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosClient.get('/api/users/profile');
        setUser(response.data);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Lấy danh sách bình luận
  useEffect(() => {
    const fetchComments = async () => {
      try {
        let endpoint = '/api/comments';
        let params = {};
        
        if (itemId) {
          params.item_id = itemId;
        } else if (categoryId) {
          params.category_id = categoryId;
        } else {
          throw new Error('Cần cung cấp itemId hoặc categoryId');
        }

        const response = await axiosClient.get(endpoint, { params });
        setComments(response.data);
      } catch (err) {
        console.error('Lỗi khi tải bình luận:', err);
        setError('Không thể tải bình luận. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [itemId, categoryId]);

  // Gửi bình luận mới
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      setError('Vui lòng đăng nhập để bình luận');
      return;
    }

    setSubmitting(true);
    try {
      const commentData = {
        comment_content: newComment,
        parent_comment_id: replyTo,
      };

      if (itemId) {
        commentData.item_id = itemId;
      } else if (categoryId) {
        commentData.category_id = categoryId;
      }

      const response = await axiosClient.post('/api/comments', commentData);
      
      // Cập nhật danh sách bình luận
      if (replyTo) {
        // Nếu là trả lời, thêm vào danh sách con của bình luận cha
        setComments(comments.map(comment => {
          if (comment.comment_id === replyTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data]
            };
          }
          return comment;
        }));
      } else {
        // Nếu là bình luận mới, thêm vào đầu danh sách
        setComments([response.data, ...comments]);
      }

      // Reset form
      setNewComment('');
      setReplyTo(null);
    } catch (err) {
      console.error('Lỗi khi gửi bình luận:', err);
      setError('Không thể gửi bình luận. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  // Xử lý like/dislike bình luận
  const handleLikeComment = async (commentId, isLike = true) => {
    if (!user) {
      setError('Vui lòng đăng nhập để thích bình luận');
      return;
    }

    try {
      const response = await axiosClient.post('/api/comments/like', {
        comment_id: commentId,
        is_like: isLike
      });

      // Cập nhật số lượng like trong danh sách bình luận
      setComments(comments.map(comment => {
        if (comment.comment_id === commentId) {
          return {
            ...comment,
            likes_count: response.data.likes_count,
            user_liked: response.data.user_liked
          };
        }
        return comment;
      }));
    } catch (err) {
      console.error('Lỗi khi thích bình luận:', err);
      setError('Không thể thích bình luận. Vui lòng thử lại sau.');
    }
  };

  // Xử lý chỉnh sửa bình luận
  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const response = await axiosClient.put(`/api/comments/${commentId}`, {
        comment_content: editText
      });

      // Cập nhật bình luận trong danh sách
      setComments(comments.map(comment => {
        if (comment.comment_id === commentId) {
          return {
            ...comment,
            comment_content: response.data.comment_content,
            updated_at: response.data.updated_at
          };
        }
        return comment;
      }));

      // Reset form
      setEditingComment(null);
      setEditText('');
    } catch (err) {
      console.error('Lỗi khi chỉnh sửa bình luận:', err);
      setError('Không thể chỉnh sửa bình luận. Vui lòng thử lại sau.');
    }
  };

  // Xử lý xóa bình luận
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

    try {
      await axiosClient.delete(`/api/comments/${commentId}`);

      // Xóa bình luận khỏi danh sách
      setComments(comments.filter(comment => comment.comment_id !== commentId));
    } catch (err) {
      console.error('Lỗi khi xóa bình luận:', err);
      setError('Không thể xóa bình luận. Vui lòng thử lại sau.');
    }
  };

  // Render một bình luận
  const renderComment = (comment) => {
    const isEditing = editingComment === comment.comment_id;
    const isOwner = user && user.user_id === comment.user_id;

    return (
      <div key={comment.comment_id} className="border-b last:border-b-0 py-4">
        <div className="flex items-start gap-3">
          <img 
            src={comment.avatar_url || '/public/logo.png'} 
            alt={comment.username} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{comment.username}</h4>
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString('vi-VN')}
              </span>
            </div>

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                  rows="3"
                ></textarea>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditingComment(null)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleEditComment(comment.comment_id)}
                    className="px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-gray-700">{comment.comment_content}</p>
            )}

            <div className="flex items-center gap-4 mt-2">
              <button 
                onClick={() => handleLikeComment(comment.comment_id, true)}
                className={`flex items-center gap-1 text-sm ${comment.user_liked === 1 ? 'text-primary-600' : 'text-gray-500'}`}
              >
                <FaThumbsUp size={14} />
                <span>{comment.likes_count || 0}</span>
              </button>
              <button 
                onClick={() => handleLikeComment(comment.comment_id, false)}
                className={`flex items-center gap-1 text-sm ${comment.user_liked === -1 ? 'text-primary-600' : 'text-gray-500'}`}
              >
                <FaThumbsDown size={14} />
              </button>
              <button 
                onClick={() => setReplyTo(comment.comment_id)}
                className="flex items-center gap-1 text-sm text-gray-500"
              >
                <FaReply size={14} />
                <span>Trả lời</span>
              </button>

              {isOwner && (
                <>
                  <button 
                    onClick={() => {
                      setEditingComment(comment.comment_id);
                      setEditText(comment.comment_content);
                    }}
                    className="flex items-center gap-1 text-sm text-gray-500"
                  >
                    <FaEdit size={14} />
                    <span>Sửa</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    className="flex items-center gap-1 text-sm text-gray-500"
                  >
                    <FaTrash size={14} />
                    <span>Xóa</span>
                  </button>
                </>
              )}
            </div>

            {/* Hiển thị form trả lời */}
            {replyTo === comment.comment_id && (
              <div className="mt-3 pl-4 border-l-2 border-gray-200">
                <form onSubmit={handleSubmitComment} className="flex flex-col gap-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết trả lời..."
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    rows="2"
                  ></textarea>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !newComment.trim()}
                      className="px-3 py-1 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Đang gửi...' : 'Gửi'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Hiển thị các trả lời */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                {comment.replies.map(reply => renderComment(reply))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 my-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-3">
            <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
            <div className="flex-1">
              <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4">Bình luận</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Form bình luận mới */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            rows="3"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md mb-6 text-center">
          <p>Vui lòng <a href="#" className="text-primary-600 hover:underline">đăng nhập</a> để bình luận.</p>
        </div>
      )}

      {/* Danh sách bình luận */}
      <div className="space-y-1 divide-y divide-gray-100">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;