// src/components/layout/client/faq/FAQCategories.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FAQCategories = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <i className="fa-solid fa-tags text-amber-500 mr-2"></i>
        Danh mục câu hỏi
      </h3>
      <div className="flex flex-wrap gap-3 overflow-x-auto scroll-smooth scrollbar-hide">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {category.name}
            <span className="ml-2 bg-white text-amber-700 rounded-full px-2 py-0.5 text-xs shadow-sm">
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FAQCategories;