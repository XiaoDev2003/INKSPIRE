import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
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
    category: 'general',
    status: 'published'
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách FAQ
    // Hiện tại sử dụng dữ liệu mẫu
    const mockFaqs = [
      { faq_id: 1, question: 'Thư pháp là gì?', answer: 'Thư pháp là nghệ thuật viết chữ đẹp, nhấn mạnh vào hình thức và cách trình bày của các ký tự viết tay.', category: 'general', status: 'published', created_at: '2023-01-15' },
      { faq_id: 2, question: 'Làm thế nào để bắt đầu học thư pháp?', answer: 'Để bắt đầu học thư pháp, bạn cần chuẩn bị các dụng cụ cơ bản như bút, mực, giấy và tìm hiểu các kỹ thuật cơ bản. Bạn có thể bắt đầu với các bài tập đơn giản và dần dần nâng cao kỹ năng.', category: 'learning', status: 'published', created_at: '2023-02-10' },
      { faq_id: 3, question: 'Các dụng cụ cần thiết cho thư pháp là gì?', answer: 'Các dụng cụ cơ bản cho thư pháp bao gồm bút lông, mực tàu, giấy thư pháp, đá mài mực, bàn đá và các phụ kiện khác như con dấu, giá vẽ.', category: 'tools', status: 'published', created_at: '2023-03-05' },
      { faq_id: 4, question: 'Sự khác biệt giữa thư pháp truyền thống và hiện đại?', answer: 'Thư pháp truyền thống tuân theo các quy tắc nghiêm ngặt về cấu trúc, bố cục và kỹ thuật, trong khi thư pháp hiện đại có nhiều tự do sáng tạo hơn, kết hợp các phong cách và kỹ thuật mới.', category: 'styles', status: 'draft', created_at: '2023-04-20' },
      { faq_id: 5, question: 'Làm thế nào để bảo quản tác phẩm thư pháp?', answer: 'Để bảo quản tác phẩm thư pháp, bạn nên tránh ánh nắng trực tiếp, độ ẩm cao và nhiệt độ thay đổi đột ngột. Nên đóng khung tác phẩm bằng kính chống tia UV và treo ở nơi khô ráo, thoáng mát.', category: 'preservation', status: 'published', created_at: '2023-05-15' },
    ];

    setFaqs(mockFaqs);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFaq = () => {
    setCurrentFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      status: 'published'
    });
    setShowModal(true);
  };

  const handleEditFaq = (faq) => {
    setCurrentFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      status: faq.status
    });
    setShowModal(true);
  };

  const handleDeleteFaq = (faqId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      // Trong thực tế, sẽ gọi API để xóa FAQ
      setFaqs(faqs.filter(faq => faq.faq_id !== faqId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFaq) {
      // Cập nhật FAQ hiện có
      setFaqs(faqs.map(faq => {
        if (faq.faq_id === currentFaq.faq_id) {
          return { ...faq, ...formData };
        }
        return faq;
      }));
    } else {
      // Thêm FAQ mới
      const newFaq = {
        faq_id: faqs.length + 1,
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setFaqs([...faqs, newFaq]);
    }

    setShowModal(false);
  };

  const toggleExpand = (faqId) => {
    if (expandedFaq === faqId) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(faqId);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      default:
        return status;
    }
  };

  const getCategoryText = (category) => {
    switch(category) {
      case 'general':
        return 'Chung';
      case 'learning':
        return 'Học tập';
      case 'tools':
        return 'Dụng cụ';
      case 'styles':
        return 'Phong cách';
      case 'preservation':
        return 'Bảo quản';
      default:
        return category;
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi, câu trả lời hoặc danh mục"
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
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(faq.status)}`}>
                          {getStatusText(faq.status)}
                        </span>
                        <span className="text-xs text-gray-500">{getCategoryText(faq.category)}</span>
                      </div>
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

      {/* Modal thêm/sửa FAQ */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={(e) => e.stopPropagation()}>
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
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Danh mục
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="general">Chung</option>
                        <option value="learning">Học tập</option>
                        <option value="tools">Dụng cụ</option>
                        <option value="styles">Phong cách</option>
                        <option value="preservation">Bảo quản</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="published">Đã xuất bản</option>
                        <option value="draft">Bản nháp</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentFaq ? 'Cập nhật' : 'Thêm mới'}
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

export default FAQ;