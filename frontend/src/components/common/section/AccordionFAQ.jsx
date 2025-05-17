import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axiosClient from '../../../api/axiosClient';

/**
 * Component hiển thị câu hỏi thường gặp dạng accordion
 * Tự động lấy dữ liệu từ API và hiển thị theo dạng mở rộng
 */
const AccordionFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axiosClient.get('/api/queries');
        setFaqs(response.data);
      } catch (err) {
        console.error('Lỗi khi tải câu hỏi thường gặp:', err);
        setError('Không thể tải câu hỏi thường gặp. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 my-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-gray-200 h-20 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-8">
      {faqs.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>Chưa có câu hỏi thường gặp nào.</p>
        </div>
      ) : (
        faqs.map((faq, index) => (
          <div 
            key={faq.query_id} 
            className={`border rounded-md overflow-hidden transition-all duration-300 ${activeIndex === index ? 'accordion-active' : ''}`}
          >
            <div 
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="font-medium text-lg">{faq.question_content}</h3>
              <div className="text-primary-600">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            <div className="accordion-content px-4">
              <div className="py-4">
                <p className="text-gray-600 mb-2">{faq.short_answer}</p>
                <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: faq.full_answer }} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AccordionFAQ;