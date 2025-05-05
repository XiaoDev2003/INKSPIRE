// src/components/layout/client/faq/FAQHelpCenter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FAQHelpCenter = () => {
  const supportOptions = [
    {
      icon: "fa-solid fa-comments",
      title: "Chat trực tuyến",
      description: "Trò chuyện trực tiếp với đội ngũ hỗ trợ của chúng tôi",
      link: "/support/chat",
      color: "amber"
    },
    {
      icon: "fa-solid fa-envelope",
      title: "Email hỗ trợ",
      description: "Gửi email đến support@inkspire.vn",
      link: "mailto:support@inkspire.vn",
      color: "green"
    },
    {
      icon: "fa-solid fa-phone",
      title: "Hotline",
      description: "Gọi cho chúng tôi: (024) 1234 5678",
      link: "tel:02412345678",
      color: "blue"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Trung tâm hỗ trợ</h3>
        <Link to="/help-center" className="text-amber-600 hover:text-amber-800 text-sm font-medium hover:underline">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {supportOptions.map((option, index) => (
          <Link
            key={index}
            to={option.link}
            className={`flex items-center p-4 rounded-lg bg-${option.color}-50 hover:bg-${option.color}-100 transition-colors duration-300`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${option.color}-100 flex items-center justify-center text-${option.color}-600`}>
              <i className={option.icon}></i>
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-800">{option.title}</h4>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <div className="ml-auto text-gray-400">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-amber-50 rounded-lg p-4 flex items-start">
          <div className="flex-shrink-0 text-amber-600 mt-1">
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              Không tìm thấy câu trả lời bạn cần? Hãy gửi câu hỏi mới và chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800"
            >
              Đặt câu hỏi mới
              <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQHelpCenter;