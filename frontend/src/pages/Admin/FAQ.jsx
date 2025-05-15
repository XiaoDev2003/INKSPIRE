import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });
  const [error, setError] = useState(null);

  const fetchFaqs = async () => {
    try {
      const response = await axiosClient.get('/api/queries');
      console.log('Fetched FAQs:', response.data);
      const formattedFaqs = response.data.map(faq => ({
        faq_id: faq.query_id,
        question: faq.question_content,
        answer: faq.full_answer,
        created_at: new Date(faq.added_at).toLocaleDateString('vi-VN'),
      }));
      setFaqs(formattedFaqs);
    } catch (err) {
      console.error('Error fetching FAQs:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu câu hỏi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFaq = () => {
    setCurrentFaq(null);
    setFormData({
      question: '',
      answer: '',
    });
    setShowModal(true);
  };

  const handleEditFaq = (faq) => {
    setCurrentFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setShowModal(true);
  };

  const handleDeleteFaq = async (faqId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      try {
        console.log('Deleting FAQ with ID:', faqId); // Thêm log để debug
        const response = await axiosClient.delete('/api/queries', {
          data: { query_id: faqId },
        });
        console.log('Delete response:', response.data);
        await fetchFaqs();
      } catch (err) {
        console.error('Error deleting FAQ:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa câu hỏi.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        question_content: formData.question,
        short_answer: formData.answer.substring(0, 255),
        full_answer: formData.answer,
      };
      console.log('Payload gửi lên API:', payload);

      if (currentFaq) {
        console.log('Updating FAQ with ID:', currentFaq.faq_id);
        await axiosClient.put('/api/queries', {
          query_id: currentFaq.faq_id,
          ...payload,
        });
      } else {
        console.log('Adding new FAQ');
        await axiosClient.post('/api/queries', payload);
      }
      await fetchFaqs();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving FAQ:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi lưu câu hỏi.');
    }
  };

  const toggleExpand = (faqId) => {
    if (expandedFaq === faqId) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(faqId);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý Câu hỏi thường gặp (FAQ)</h1>
        <button
          onClick={handleAddFaq}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm câu hỏi
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi hoặc câu trả lời"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy câu hỏi nào</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.faq_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(faq.faq_id)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFaq(faq);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(faq.faq_id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                      {expandedFaq === faq.faq_id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {expandedFaq === faq.faq_id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                      <div className="mt-2 text-xs text-gray-500">Ngày tạo: {faq.created_at}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }} onClick={() => setShowModal(false)}>
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8"
              style={{ position: 'relative', zIndex: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentFaq ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                        Câu hỏi
                      </label>
                      <input
                        type="text"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                        Câu trả lời
                      </label>
                      <textarea
                        id="answer"
                        name="answer"
                        rows="4"
                        value={formData.answer}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-3"
                  >
                    {currentFaq ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-3"
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

export default FAQ;