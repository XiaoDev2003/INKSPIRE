import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaSearch, FaEye, FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      // Đơn giản hóa: chỉ lấy tất cả bình luận không có tham số
      const response = await axiosClient.get('/api/comments');

      // Kiểm tra dữ liệu trả về
      if (!response.data || !Array.isArray(response.data)) {
        setError('Không thể tải dữ liệu bình luận');
        setComments([]);
        return;
      }

      // Định dạng dữ liệu bình luận
      const formattedComments = response.data.map(comment => {
        return {
          comment_id: comment.comment_id || 0,
          user_id: comment.user_id || 0,
          user_name: comment.username || 'Ẩn danh',
          item_id: comment.item_id || null,
          item_name: comment.item_name || 'Không xác định',
          category_id: comment.category_id || null,
          // Sử dụng category_name từ JOIN với bảng categories
          category_name: comment.category_name || 'Không xác định',
          comment_content: comment.comment_content || '',
          created_at: comment.created_at ? new Date(comment.created_at).toLocaleString('vi-VN') : 'Không xác định',
          likes_count: comment.likes_count || 0,
          dislikes_count: comment.dislikes_count || 0,
          parent_comment_id: comment.parent_comment_id || null
        };
      });

      setComments(formattedComments);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu bình luận:', err);
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredComments = comments.filter(comment =>
    comment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.comment_content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewComment = (comment) => {
    setCurrentComment(comment);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      try {
        const response = await axiosClient.delete(`/api/comments/${commentId}`);
        setComments(comments.filter(comment => comment.comment_id !== commentId));
        setSuccess('Xóa bình luận thành công!');

        // Tự động ẩn thông báo thành công sau 3 giây
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } catch (err) {
        console.error('Lỗi khi xóa bình luận:', err);
        setError(err.response?.data?.error || 'Không thể xóa bình luận. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý bình luận</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-green-600">{success}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo người dùng, sản phẩm hoặc nội dung"
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy bình luận nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm/Danh mục
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt thích/Không thích
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComments.map((comment) => (
                  <tr key={comment.comment_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{comment.user_name}</div>
                      <div className="text-sm text-gray-500">ID: {comment.user_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{comment.item_name}</div>
                      <div className="text-sm text-gray-500">ID: {comment.item_id}</div>
                      {comment.category_name && (
                        <div className="text-xs text-amber-600 mt-1">
                          Danh mục: {comment.category_name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{comment.comment_content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comment.created_at}
                      {comment.parent_comment_id && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          Trả lời
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <FaThumbsUp className="text-green-500 mr-1" />
                          <span>{comment.likes_count}</span>
                        </div>
                        <div className="flex items-center">
                          <FaThumbsDown className="text-red-500 mr-1" />
                          <span>{comment.dislikes_count}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewComment(comment)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.comment_id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa bình luận"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal xem chi tiết bình luận */}
      {showViewModal && currentComment && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }} onClick={handleCloseModal}>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8"
              style={{ position: 'relative', zIndex: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết bình luận</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Người bình luận</h4>
                    <p className="mt-1">{currentComment.user_name} (ID: {currentComment.user_id})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Sản phẩm/Danh mục</h4>
                    <p className="mt-1">{currentComment.item_name} (ID: {currentComment.item_id})</p>
                    {currentComment.category_name && (
                      <p className="mt-1 text-xs text-amber-600">Danh mục: {currentComment.category_name}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ngày bình luận</h4>
                    <p className="mt-1">{currentComment.created_at}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Lượt thích</h4>
                      <p className="mt-1 flex items-center">
                        <FaThumbsUp className="text-green-500 mr-1" />
                        {currentComment.likes_count || 0}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Lượt không thích</h4>
                      <p className="mt-1 flex items-center">
                        <FaThumbsDown className="text-red-500 mr-1" />
                        {currentComment.dislikes_count || 0}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nội dung bình luận</h4>
                    <p className="mt-1 text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md">{currentComment.comment_content}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:w-auto sm:text-sm"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteComment(currentComment.comment_id);
                    handleCloseModal();
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm mr-2"
                >
                  Xóa bình luận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </AdminLayout>
  );
};

export default Comments;