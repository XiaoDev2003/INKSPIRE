import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaTrash, FaSearch, FaEye, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách bình luận
    // Hiện tại sử dụng dữ liệu mẫu
    const mockComments = [
      { comment_id: 1, user_id: 3, user_name: 'Nguyễn Văn A', item_id: 5, item_name: 'Thư pháp Việt', comment_content: 'Font chữ này rất đẹp và dễ sử dụng. Tôi đã dùng nó cho nhiều dự án của mình.', status: 'approved', created_at: '2023-05-15' },
      { comment_id: 2, user_id: 5, user_name: 'Trần Thị B', item_id: 8, item_name: 'Chữ Thảo', comment_content: 'Tôi gặp một chút khó khăn khi sử dụng font này. Liệu có hướng dẫn chi tiết hơn không?', status: 'pending', created_at: '2023-05-20' },
      { comment_id: 3, user_id: 8, user_name: 'Lê Văn C', item_id: 12, item_name: 'Triện thư', comment_content: 'Font chữ này rất phù hợp cho các dự án thiết kế cổ điển. Tôi rất hài lòng với chất lượng.', status: 'approved', created_at: '2023-06-01' },
      { comment_id: 4, user_id: 12, user_name: 'Phạm Thị D', item_id: 15, item_name: 'Thư pháp hiện đại', comment_content: 'Tôi thấy font này không hiển thị đúng trên một số trình duyệt. Có thể kiểm tra lại không?', status: 'pending', created_at: '2023-06-10' },
      { comment_id: 5, user_id: 15, user_name: 'Hoàng Văn E', item_id: 18, item_name: 'Lệ thư', comment_content: 'Đây là một trong những font chữ thư pháp đẹp nhất mà tôi từng sử dụng. Cảm ơn vì đã chia sẻ!', status: 'approved', created_at: '2023-06-15' },
    ];
    
    setComments(mockComments);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredComments = comments.filter(comment => 
    comment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.comment_content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      // Trong thực tế, sẽ gọi API để xóa bình luận
      setComments(comments.filter(comment => comment.comment_id !== commentId));
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
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    
    // Trong thực tế, sẽ gọi API để cập nhật bình luận
    setComments(comments.map(comment => {
      if (comment.comment_id === currentComment.comment_id) {
        return { ...comment, comment_content: editedComment };
      }
      return comment;
    }));
    
    setShowModal(false);
  };

  const handleApproveComment = (commentId) => {
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
    setComments(comments.map(comment => {
      if (comment.comment_id === commentId) {
        return { ...comment, status: 'approved' };
      }
      return comment;
    }));
  };

  const handleRejectComment = (commentId) => {
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
    setComments(comments.map(comment => {
      if (comment.comment_id === commentId) {
        return { ...comment, status: 'rejected' };
      }
      return comment;
    }));
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved':
        return 'Đã duyệt';
      case 'pending':
        return 'Chờ duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý bình luận</h1>
      </div>

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
                    Trạng thái
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(comment.status)}`}>
                        {getStatusText(comment.status)}
                      </span>
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
                        {comment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveComment(comment.comment_id)}
                              className="text-green-600 hover:text-green-900"
                              title="Duyệt"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleRejectComment(comment.comment_id)}
                              className="text-red-600 hover:text-red-900"
                              title="Từ chối"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    <h4 className="text-sm font-medium text-gray-500">Trạng thái</h4>
                    <p className="mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(currentComment.status)}`}>
                        {getStatusText(currentComment.status)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nội dung bình luận</h4>
                    <p className="mt-1 text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md">{currentComment.comment_content}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {currentComment.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleApproveComment(currentComment.comment_id);
                        setShowViewModal(false);
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Duyệt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleRejectComment(currentComment.comment_id);
                        setShowViewModal(false);
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Từ chối
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleEditComment(currentComment)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    onClick={() => setShowModal(false)}
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