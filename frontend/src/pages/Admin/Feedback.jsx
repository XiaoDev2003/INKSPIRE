import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaTrash, FaSearch, FaEye, FaDownload } from 'react-icons/fa';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Thêm thông báo thành công

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosClient.get('/api/feedback');
        const formattedFeedbacks = response.data.map(feedback => ({
          feedback_id: feedback.feedback_id,
          user_id: feedback.user_id,
          user_name: feedback.username || 'Ẩn danh',
          feedback_message: feedback.feedback_message,
          feedback_url: feedback.feedback_url,
          attachment: feedback.feedback_attachment_url,
          created_at: new Date(feedback.submitted_at).toLocaleDateString('vi-VN'),
        }));
        setFeedbacks(formattedFeedbacks);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu phản hồi.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.feedback_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (feedback.feedback_url && feedback.feedback_url.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      try {
        const response = await axiosClient.delete('/api/feedback', {
          data: { feedback_id: feedbackId },
        });
        setFeedbacks(feedbacks.filter(feedback => feedback.feedback_id !== feedbackId));
        setSuccess('Xóa phản hồi thành công!'); // Hiển thị thông báo thành công
      } catch (err) {
        console.error('Error deleting feedback:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa phản hồi.');
      }
    }
  };

  const handleViewFeedback = (feedback) => {
    setCurrentFeedback(feedback);
    setShowViewModal(true);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý phản hồi</h1>
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
            placeholder="Tìm kiếm theo người dùng, nội dung hoặc URL"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy phản hồi nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tệp đính kèm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.feedback_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{feedback.user_name}</div>
                      <div className="text-sm text-gray-500">ID: {feedback.user_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{feedback.feedback_message}</div>
                      {feedback.feedback_url && (
                        <div className="text-xs text-blue-600 truncate mt-1">
                          <a href={feedback.feedback_url} target="_blank" rel="noopener noreferrer">
                            {feedback.feedback_url}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feedback.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feedback.attachment ? (
                        <a href={feedback.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
                          <FaDownload className="mr-1" />
                          <span>{feedback.attachment.split('/').pop()}</span>
                        </a>
                      ) : (
                        <span>Không có</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewFeedback(feedback)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(feedback.feedback_id)}
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

      {/* Modal xem chi tiết phản hồi */}
      {showViewModal && currentFeedback && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }} onClick={() => setShowViewModal(false)}>
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết phản hồi</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Người gửi</h4>
                    <p className="mt-1">{currentFeedback.user_name} (ID: {currentFeedback.user_id})</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ngày gửi</h4>
                    <p className="mt-1">{currentFeedback.created_at}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Nội dung phản hồi</h4>
                    <p className="mt-1 text-gray-800 whitespace-pre-line">{currentFeedback.feedback_message}</p>
                  </div>
                  {currentFeedback.feedback_url && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">URL liên quan</h4>
                      <a 
                        href={currentFeedback.feedback_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-1 text-blue-600 hover:underline block truncate"
                      >
                        {currentFeedback.feedback_url}
                      </a>
                    </div>
                  )}
                  {currentFeedback.attachment && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tệp đính kèm</h4>
                      <a 
                        href={currentFeedback.attachment} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-1 text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaDownload className="mr-1" />
                        <span>{currentFeedback.attachment.split('/').pop()}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
    </AdminLayout>
  );
};

export default Feedback;