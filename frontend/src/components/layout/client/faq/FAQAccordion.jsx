// src/components/layout/client/faq/FAQAccordion.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Animation variants
  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={accordionVariants}
    >
      {/* Nếu có dữ liệu */}
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={item.id || index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                aria-expanded={isActive}
              >
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-200 flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-3 ${isActive ? 'bg-amber-500' : 'bg-gray-300'}`}></span>
                  {item.question}
                </h3>
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-amber-700 bg-amber-50 p-2 rounded-full"
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.span>
              </button>

              {/* Nội dung trả lời */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-4 bg-gradient-to-b from-amber-50 to-white border-t border-amber-100">
                      <motion.p
                        className="text-gray-700 leading-relaxed font-sans"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.answer}
                      </motion.p>

                      {/* Liên kết liên quan nếu có */}
                      {item.relatedLinks?.length > 0 && (
                        <motion.div
                          className="mt-6 bg-white p-4 rounded-lg border border-amber-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="font-medium text-gray-800 flex items-center">
                            <i className="fa-solid fa-link-simple mr-2 text-amber-600"></i>
                            Liên kết liên quan:
                          </p>
                          <ul className="mt-3 space-y-2">
                            {item.relatedLinks.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-200 p-2 rounded-lg hover:bg-amber-50"
                                >
                                  <i className="fa-solid fa-link mr-2 text-xs"></i>
                                  {link.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      <motion.div
                        className="mt-4 text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-xs text-gray-500 italic">Câu trả lời có hữu ích không?</span>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button className="px-3 py-1 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors duration-200 text-sm flex items-center">
                            <i className="fa-solid fa-thumbs-up mr-1"></i> Có
                          </button>
                          <button className="px-3 py-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors duration-200 text-sm flex items-center">
                            <i className="fa-solid fa-thumbs-down mr-1"></i> Không
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      ) : (
        // Trường hợp không có dữ liệu phù hợp
        <motion.div
          className="bg-white rounded-xl shadow-md p-8 text-center border border-amber-100"
          variants={accordionVariants}
        >
          <div className="text-amber-500 text-5xl mb-6">
            <i className="fa-solid fa-search"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Không tìm thấy kết quả</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Không có câu hỏi nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác hoặc đặt câu hỏi mới.
          </p>
          <button className="mt-6 px-6 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors duration-200 inline-flex items-center">
            <i className="fa-solid fa-plus mr-2"></i> Đặt câu hỏi mới
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FAQAccordion;