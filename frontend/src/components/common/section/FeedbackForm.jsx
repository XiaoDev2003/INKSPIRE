import React, { useState } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import axiosClient from '../../../api/axiosClient';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

/**
 * Component form gửi góp ý
 * @param {Object} props - Component props
 * @param {string} props.currentUrl - URL hiện tại để gửi kèm góp ý
 */
const FeedbackForm = ({ currentUrl }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    feedback_message: '',
    feedback_url: currentUrl || window.location.href
  });
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước file không được vượt quá 5MB');
        return;
      }
      setAttachment(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.feedback_message.trim()) {
      setError('Vui lòng nhập nội dung góp ý');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const feedbackFormData = new FormData();
      feedbackFormData.append('feedback_message', formData.feedback_message);
      feedbackFormData.append('feedback_url', formData.feedback_url);
      
      if (attachment) {
        feedbackFormData.append('attachment', attachment);
      }

      // Thêm user_id vào form data nếu người dùng đã đăng nhập
      if (user && user.user_id) {
        feedbackFormData.append('user_id', user.user_id);
      }
      
      await axiosClient.post('/api/feedback', feedbackFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form sau khi gửi thành công
      setFormData({
        feedback_message: '',
        feedback_url: currentUrl || window.location.href
      });
      setAttachment(null);
      setSuccess(true);
    } catch (err) {
      console.error('Lỗi khi gửi góp ý:', err);
      setError('Không thể gửi góp ý. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h3 className="text-xl font-semibold mb-4">Gửi góp ý</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Cảm ơn bạn đã gửi góp ý! Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback_message" className="block text-gray-700 mb-2">Nội dung góp ý</label>
          <textarea
            id="feedback_message"
            name="feedback_message"
            value={formData.feedback_message}
            onChange={handleInputChange}
            rows="5"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            placeholder="Nhập góp ý của bạn tại đây..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="attachment" className="block text-gray-700 mb-2">Đính kèm file (nếu có)</label>
          <div className="flex items-center">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors">
              <FaPaperclip />
              <span>{attachment ? attachment.name : 'Chọn file'}</span>
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </label>
            {attachment && (
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Xóa
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Hỗ trợ: Hình ảnh, PDF, Word, Text (tối đa 5MB)</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
            {loading ? 'Đang gửi...' : 'Gửi góp ý'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;