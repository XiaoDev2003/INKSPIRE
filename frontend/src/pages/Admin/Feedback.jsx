import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaTrash, FaSearch, FaReply, FaEye, FaDownload, FaCheckCircle, FaClock } from 'react-icons/fa';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách phản hồi
    // Hiện tại sử dụng dữ liệu mẫu
    const mockFeedbacks = [
      { feedback_id: 1, user_id: 3, user_name: 'Nguyễn Văn A', feedback_message: 'Tôi rất thích trang web này, nhưng tôi muốn đề xuất thêm một số font chữ truyền thống.', feedback_url: 'https://inkspire.com/category/traditional', attachment: 'example1.jpg', status: 'pending', created_at: '2023-05-15', reply: null },
      { feedback_id: 2, user_id: 5, user_name: 'Trần Thị B', feedback_message: 'Tôi gặp lỗi khi tải xuống font chữ Triện thư. Vui lòng kiểm tra lại đường dẫn.', feedback_url: 'https://inkspire.com/items/25', attachment: null, status: 'replied', created_at: '2023-05-20', reply: 'Cảm ơn bạn đã báo cáo. Chúng tôi đã sửa lỗi này.' },
      { feedback_id: 3, user_id: 8, user_name: 'Lê Văn C', feedback_message: 'Tôi muốn đề xuất thêm tính năng chia sẻ tác phẩm thư pháp lên mạng xã hội.', feedback_url: null, attachment: null, status: 'pending', created_at: '2023-06-01', reply: null },
      { feedback_id: 4, user_id: 12, user_name: 'Phạm Thị D', feedback_message: 'Tôi thấy một số lỗi chính tả trong bài viết về lịch sử thư pháp Việt Nam.', feedback_url: 'https://inkspire.com/about/history', attachment: 'screenshot.png', status: 'resolved', created_at: '2023-06-10', reply: 'Cảm ơn bạn đã góp ý. Chúng tôi đã sửa các lỗi chính tả.' },
      { feedback_id: 5, user_id: 15, user_name: 'Hoàng Văn E', feedback_message: 'Tôi muốn đề xuất tổ chức một cuộc thi thư pháp trực tuyến trên trang web.', feedback_url: null, attachment: 'proposal.pdf', status: 'pending', created_at: '2023-06-15', reply: null },
    ];
    
    setFeedbacks(mockFeedbacks);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.feedback_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (feedback.feedback_url && feedback.feedback_url.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteFeedback = (feedbackId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      // Trong thực tế, sẽ gọi API để xóa phản hồi
      setFeedbacks(feedbacks.filter(feedback => feedback.feedback_id !== feedbackId));
    }
  };

  const handleViewFeedback = (feedback) => {
    setCurrentFeedback(feedback);
    setShowViewModal(true);
  };

  const handleReplyFeedback = (feedback) => {
    setCurrentFeedback(feedback);
    setReplyText(feedback.reply || '');
    setShowModal(true);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    
    // Trong thực tế, sẽ gọi API để gửi phản hồi
    setFeedbacks(feedbacks.map(feedback => {
      if (feedback.feedback_id === currentFeedback.feedback_id) {
        return { ...feedback, reply: replyText, status: 'replied' };
      }
      return feedback;
    }));
    
    setShowModal(false);
  };

  const handleMarkAsResolved = (feedbackId) => {
    // Trong thực tế, sẽ gọi API để cập nhật trạng thái
    setFeedbacks(feedbacks.map(feedback => {
      if (feedback.feedback_id === feedbackId) {
        return { ...feedback, status: 'resolved' };
      }
      return feedback;
    }));
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'replied':
        return 'Đã phản hồi';
      case 'resolved':
        return 'Đã giải quyết';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'replied':
        return <FaReply className="text-blue-500" />;
      case 'resolved':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý phản hồi</h1>
      </div>

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
                    Trạng thái
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(feedback.status)}`}>
                          {getStatusIcon(feedback.status)}
                          <span className="ml-1">{getStatusText(feedback.status)}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feedback.attachment ? (
                        <button className="text-blue-600 hover:text-blue-800 flex items-center">
                          <FaDownload className="mr-1" />
                          <span>{feedback.attachment}</span>
                        </button>
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
                          onClick={() => handleReplyFeedback(feedback)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Phản hồi"
                        >
                          <FaReply />
                        </button>
                        {feedback.status === 'replied' && (
                          <button
                            onClick={() => handleMarkAsResolved(feedback.feedback_id)}
                            className="text-green-600 hover:text-green-900"
                            title="Đánh dấu đã giải quyết"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={(e) => e.stopPropagation()}>
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
                      <button className="mt-1 text-blue-600 hover:text-blue-800 flex items-center">
                        <FaDownload className="mr-1" />
                        <span>{currentFeedback.attachment}</span>
                      </button>
                    </div>
                  )}
                  {currentFeedback.reply && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Phản hồi của bạn</h4>
                      <p className="mt-1 text-gray-800 whitespace-pre-line bg-amber-50 p-3 rounded-md">{currentFeedback.reply}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleReplyFeedback(currentFeedback)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Phản hồi
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

      {/* Modal phản hồi */}
      {showModal && currentFeedback && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmitReply}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Phản hồi cho {currentFeedback.user_name}</h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Nội dung phản hồi gốc</h4>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{currentFeedback.feedback_message}</p>
                  </div>
                  <div>
                    <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung phản hồi của bạn
                    </label>
                    <textarea
                      id="reply"
                      rows="4"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Nhập nội dung phản hồi..."
                      required
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Gửi phản hồi
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

export default Feedback;