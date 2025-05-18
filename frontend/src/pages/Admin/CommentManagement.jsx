import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Card } from '../../components/ui/ui';

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'likes', 'dislikes'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterItem, setFilterItem] = useState('');
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [commentsResponse, itemsResponse, usersResponse] = await Promise.all([
          axiosClient.get('/api/comments?parent_only=true'),
          axiosClient.get('/api/items'),
          axiosClient.get('/api/users'),
        ]);

        setItems(itemsResponse.data);
        setUsers(usersResponse.data);

        // Xử lý dữ liệu bình luận
        let commentsData = commentsResponse.data;

        // Lọc theo item nếu có
        if (filterItem) {
          commentsData = commentsData.filter(comment => comment.item_id === parseInt(filterItem));
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
          commentsData = commentsData.filter(comment =>
            comment.comment_content.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Sắp xếp bình luận
        if (sortBy === 'newest') {
          commentsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortBy === 'likes') {
          commentsData.sort((a, b) => b.likes_count - a.likes_count);
        } else if (sortBy === 'dislikes') {
          commentsData.sort((a, b) => b.dislikes_count - a.dislikes_count);
        }

        // Tính toán phân trang
        setTotalPages(Math.ceil(commentsData.length / itemsPerPage));

        // Định dạng bình luận với thông tin đầy đủ
        const formattedComments = commentsData.map(comment => {
          // Tìm thông tin người dùng
          const user = users.find(u => u.user_id === comment.user_id) || {};
          const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Ẩn danh';

          // Tìm thông tin item
          const item = items.find(i => i.item_id === comment.item_id) || {};

          return {
            ...comment,
            user_name: fullName,
            user_avatar: user.avatar_url,
            item_name: item.item_name || 'Không xác định',
            formatted_date: new Date(comment.created_at).toLocaleString('vi-VN'),
          };
        });

        setComments(formattedComments);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, filterItem, searchTerm]);

  // Xử lý xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      await axiosClient.delete(`/api/comments/${commentId}`);

      // Cập nhật danh sách bình luận
      setComments(comments.filter(comment => comment.comment_id !== commentId));
      setConfirmDelete(null);
      setSuccessMessage('Xóa bình luận thành công!');

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Đã có lỗi khi xóa bình luận.');
      console.error('Delete Error:', err);
    }
  };

  // Xử lý chỉnh sửa bình luận
  const handleEditComment = async (e) => {
    e.preventDefault();

    if (!editContent.trim()) {
      setError('Nội dung bình luận không được để trống.');
      return;
    }

    try {
      await axiosClient.put(`/api/comments/${editingComment.comment_id}`, {
        comment_content: editContent
      });

      // Cập nhật danh sách bình luận
      const updatedComments = comments.map(comment => {
        if (comment.comment_id === editingComment.comment_id) {
          return {
            ...comment,
            comment_content: editContent
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setEditingComment(null);
      setEditContent('');
      setSuccessMessage('Cập nhật bình luận thành công!');

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Đã có lỗi khi cập nhật bình luận.');
      console.error('Update Error:', err);
    }
  };

  // Xử lý phân trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Lấy bình luận cho trang hiện tại
  const getCurrentPageComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý bình luận</h1>

      {/* Thông báo */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}

      {/* Bộ lọc và tìm kiếm */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm bình luận..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filterItem}
              onChange={(e) => setFilterItem(e.target.value)}
            >
              <option value="">Tất cả font chữ</option>
              {items.map(item => (
                <option key={item.item_id} value={item.item_id}>
                  {item.item_name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3 flex space-x-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`flex-1 py-2 px-3 rounded-md ${sortBy === 'newest' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <i className="fas fa-clock mr-2"></i>
              Mới nhất
            </button>
            <button
              onClick={() => setSortBy('likes')}
              className={`flex-1 py-2 px-3 rounded-md ${sortBy === 'likes' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <i className="fas fa-thumbs-up mr-2"></i>
              Lượt thích
            </button>
            <button
              onClick={() => setSortBy('dislikes')}
              className={`flex-1 py-2 px-3 rounded-md ${sortBy === 'dislikes' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <i className="fas fa-thumbs-down mr-2"></i>
              Lượt không thích
            </button>
          </div>
        </div>
      </Card>

      {/* Danh sách bình luận */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">Không tìm thấy bình luận nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {getCurrentPageComments().map(comment => (
            <Card key={comment.comment_id} className="overflow-hidden">
              {/* Phần chỉnh sửa bình luận */}
              {editingComment && editingComment.comment_id === comment.comment_id ? (
                <form onSubmit={handleEditComment} className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Chỉnh sửa bình luận</h3>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24 mb-3"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                  ></textarea>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingComment(null);
                        setEditContent('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4">
                  {/* Thông tin bình luận */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mr-3 overflow-hidden">
                        {comment.user_avatar ? (
                          <img src={comment.user_avatar} alt={comment.user_name} className="w-full h-full object-cover" />
                        ) : (
                          comment.user_name[0]
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{comment.user_name}</h4>
                        <p className="text-xs text-gray-500">{comment.formatted_date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {comment.item_name}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <i className="fas fa-thumbs-up"></i>
                        <span>{comment.likes_count}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <i className="fas fa-thumbs-down"></i>
                        <span>{comment.dislikes_count}</span>
                      </div>
                    </div>
                  </div>

                  {/* Nội dung bình luận */}
                  <div className="mb-4">
                    <p className="text-gray-700">{comment.comment_content}</p>
                  </div>

                  {/* Các nút hành động */}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingComment(comment);
                        setEditContent(comment.comment_content);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Sửa
                    </button>
                    <button
                      onClick={() => setConfirmDelete(comment)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center"
                    >
                      <i className="fas fa-trash-alt mr-1"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteComment(confirmDelete.comment_id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentManagement;