import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const FAQFeedback = () => {
  const location = useLocation(); // Chỉ khai báo một lần
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    message: '',
    attachment: null,
    url: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Kiểm tra URL từ trang Category
  useEffect(() => {
    if (location.state && location.state.referringUrl) {
      setFormData(prev => ({
        ...prev,
        url: location.state.referringUrl
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData(prev => ({ ...prev, attachment: files?.[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation phía client
    if (!formData.message.trim()) {
      setError('Vui lòng nhập nội dung phản hồi');
      return;
    }

    const formDataToSend = new FormData();
    // Sử dụng user_id từ context nếu người dùng đã đăng nhập
    formDataToSend.append('user_id', user?.user_id || null);
    formDataToSend.append('feedback_message', formData.message.trim());
    if (formData.url) {
      formDataToSend.append('feedback_url', formData.url);
    }
    if (formData.attachment) {
      formDataToSend.append('attachment', formData.attachment);
    }

    try {
      await axiosClient.post('/api/feedback', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          message: '',
          attachment: null,
          url: ''
        });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 container mx-auto ">
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">
        <i className="fa-solid fa-comment-dots text-amber-600 mr-2"></i>
        Gửi Phản Hồi
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-500 text-4xl mb-3">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Phản hồi đã được gửi!</h3>
          <p className="text-green-600">Cảm ơn bạn đã đóng góp ý kiến. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa-solid fa-pen-to-square text-amber-600 mr-2"></i>
              Tin nhắn của bạn
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors duration-200"
              placeholder="Chia sẻ câu hỏi mới hoặc góp ý về câu trả lời hiện tại..."
              required
            />
          </div>

          <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa-solid fa-paperclip text-amber-600 mr-2"></i>
              Đính kèm tệp (nếu có)
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleChange}
              accept="image/jpeg,image/png,application/pdf"
              className="w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-white file:text-sm file:font-semibold hover:file:bg-amber-700 focus-within:ring-2 ring-amber-500 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa-solid fa-link text-amber-600 mr-2"></i>
              URL liên quan (tuỳ chọn)
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow duration-200"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <i className="fa-solid fa-paper-plane mr-2"></i>
              Gửi Phản Hồi
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FAQFeedback;