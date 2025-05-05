// src/components/layout/client/faq/FAQPopularQuestions.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FAQPopularQuestions = ({ popularQuestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Câu hỏi phổ biến</h3>
      <ul className="space-y-3">
        {popularQuestions.map((item, index) => (
          <li key={index} className="hover:bg-amber-50 rounded-lg transition-colors duration-200">
            <Link 
              to={`/faq?q=${encodeURIComponent(item.question)}`}
              className="flex items-start p-2 text-gray-700 hover:text-amber-700"
            >
              <span className="text-amber-500 mr-2">
                <i className="fa-solid fa-circle-question"></i>
              </span>
              <span>{item.question}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <Link 
          to="/faq" 
          className="text-amber-600 hover:text-amber-800 text-sm font-medium hover:underline inline-flex items-center"
        >
          Xem tất cả câu hỏi
          <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
        </Link>
      </div>
    </div>
  );
};

export default FAQPopularQuestions;