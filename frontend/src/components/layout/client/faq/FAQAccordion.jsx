// src/components/layout/client/faq/FAQAccordion.jsx
import React, { useState } from 'react';

const FAQAccordion = ({ faqs, filteredCategory = 'all', searchQuery = '' }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Lọc câu hỏi theo danh mục và từ khóa tìm kiếm
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = filteredCategory === 'all' || faq.category === filteredCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Nếu có dữ liệu */}
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={item.id || index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                aria-expanded={isActive}
              >
                <h3 className="text-xl font-semibold text-gray-800">{item.question}</h3>
                <span
                  className={`text-amber-700 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>

              {/* Nội dung trả lời */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 bg-gray-50 border-t border-amber-100">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>

                  {/* Liên kết liên quan nếu có */}
                  {item.relatedLinks?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-gray-800">Liên kết liên quan:</p>
                      <ul className="mt-2 space-y-1">
                        {item.relatedLinks.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-200"
                            >
                              <i className="fa-solid fa-link mr-2 text-xs"></i>
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        // Trường hợp không có dữ liệu phù hợp
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-amber-500 text-5xl mb-4">
            <i className="fa-solid fa-search"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
          <p className="text-gray-600">
            Không có câu hỏi nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác hoặc đặt câu hỏi mới.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;