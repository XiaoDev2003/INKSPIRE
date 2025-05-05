// src/components/layout/client/faq/FAQCategories.jsx
import React from 'react';

const FAQCategories = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Danh mục câu hỏi</h3>
      <div className="flex flex-wrap gap-3 overflow-x-auto scroll-smooth scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            {category.name}
            <span className="ml-2 bg-white text-amber-700 rounded-full px-2 py-0.5 text-xs">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAQCategories;