// src/components/layout/client/faq/FAQSearch.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FAQSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.i
            className="fa-solid fa-magnifying-glass text-amber-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          ></motion.i>
        </div>
        <motion.input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-12 pr-10 py-4 border border-amber-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm"
          placeholder="Tìm kiếm câu hỏi..."
          whileFocus={{ boxShadow: '0 0 0 3px rgba(251, 191, 36, 0.2)' }}
        />
        {searchQuery && (
          <motion.button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fa-solid fa-times"></i>
          </motion.button>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500 bg-amber-50 p-3 rounded-lg">
        <p className="flex items-center">
          <i className="fa-solid fa-lightbulb text-amber-500 mr-2"></i>
          Gợi ý: Thử tìm kiếm "khóa học", "thanh toán", "tài khoản"...
        </p>
      </div>
    </motion.div>
  );
};

export default FAQSearch;