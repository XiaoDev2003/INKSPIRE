// src/components/AccordionItem.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AccordionItem = ({ title, imageSrc, content, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Dòng đầu: Ảnh + Tiêu đề + Nút ẩn/hiện */}
      <div className="flex items-center mb-4">
        {/* Hình tròn chứa ảnh */}
        <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
          <Link to={link}>
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Icon bút lông nhỏ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 mr-2 text-gray-500"
        >
          <path d="M19 19a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2" />
          <path d="M12 6v12" />
          <path d="M9 12l6.22 4.22a2.23 2.23 0 0 0 3 0 2.223 2.223 0 0 1-3 0z" />
        </svg>

        {/* Tiêu đề */}
        <div className="flex-grow">
          <Link
            to={link}
            className="text-lg font-bold text-black hover:text-gray-600 transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            {title}
          </Link>
        </div>

        {/* Nút toggle nội dung */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isOpen ? 'Ẩn' : 'Hiện'}
        </button>
      </div>

      {/* Nội dung accordion */}
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-100 bg-opacity-60 backdrop-blur-sm border border-gray-200 rounded-md">
          <p className="text-gray-700">{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;