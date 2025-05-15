import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaTrash, FaSearch, FaEye, FaEdit } from 'react-icons/fa';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Thêm thông báo thành công

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosClient.get('/api/comments');
        const formattedComments = response.data.map(comment => ({
          comment_id: comment.comment_id,
          user_id: comment.user_id,
          user_name: comment.username || 'Ẩn danh',
          item_id: comment.item_id,
          item_name: comment.item_name || 'Không xác định',
          comment_content: comment.comment_content,
          created_at: new Date(comment.created_at).toLocaleDateString('vi-VN'),
        }));
        setComments(formattedComments);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu bình luận.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredComments = comments.filter(comment => 
    comment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.comment_content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      try {
        console.log('Deleting comment with ID:', commentId); // Log debug
        const response = await axiosClient.delete('/api/comments', {
          data: { comment_id: commentId },
        });
        console.log('Delete response:', response.data);
        setComments(comments.filter(comment => comment.comment_id !== commentId));
        setSuccess('Xóa bình luận thành công!'); // Thông báo thành công
      } catch (err) {
        console.error('Error deleting comment:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa bình luận.');
      }
    }
  };

  const handleViewComment = (comment) => {
    setCurrentComment(comment);
    setShowViewModal(true);
  };

  const handleEditComment = (comment) => {
    setCurrentComment(comment);
    setEditedComment(comment.comment_content);
    setShowModal(true);
    setError(null); // Reset lỗi
    setSuccess(null); // Reset thông báo thành công
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating comment with ID:', currentComment.comment_id, 'Content:', editedComment); // Log debug
      const response = await axiosClient.put('/api/comments', { // Sửa endpoint, gửi comment_id trong body
        comment_id: currentComment.comment_id,
        comment_content: editedComment,
      });
      console.log('Update response:', response.data);
      setComments(comments.map(comment => {
        if (comment.comment_id === currentComment.comment_id) {
          return { ...comment, comment_content: editedComment };
        }
        return comment;
      }));
      setSuccess('Cập nhật bình luận thành công!'); // Thông báo thành công
      setShowModal(false);
    } catch (err) {
      console.error('Error updating comment:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi cập nhật bình luận.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setError(null);
    setSuccess(null);
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
        <div className="mb-4 relative">
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
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
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
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{comment.comment_content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {comment.created_at}
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
                          onClick={() => handleEditComment(comment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.comment_id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
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
                    <h4 className="text-sm font-medium text-gray-500">Sản phẩm</h4>
                    <p className="mt-1">{currentComment.item_name} (ID: {currentComment.item_id})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ngày bình luận</h4>
                    <p className="mt-1">{currentComment.created_at}</p>
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
                  onClick={() => handleEditComment(currentComment)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa bình luận */}
      {showModal && currentComment && (
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
              <form onSubmit={handleSubmitEdit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa bình luận</h3>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Người bình luận: {currentComment.user_name}</span>
                      <span className="text-sm text-gray-500">Ngày: {currentComment.created_at}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Sản phẩm: {currentComment.item_name}</div>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung bình luận
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Nhập nội dung bình luận..."
                      required
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Comments;