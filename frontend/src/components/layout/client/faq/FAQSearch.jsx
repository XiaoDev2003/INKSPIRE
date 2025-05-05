// src/components/layout/client/faq/FAQSearch.jsx
import React from 'react';

const FAQSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors duration-200"
          placeholder="Tìm kiếm câu hỏi..."
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        )}
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>Gợi ý: Thử tìm kiếm "khóa học", "thanh toán", "tài khoản"...</p>
      </div>
    </div>
  );
};

export default FAQSearch;