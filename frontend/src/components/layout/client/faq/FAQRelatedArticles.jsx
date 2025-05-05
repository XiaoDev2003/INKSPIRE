// src/components/layout/client/faq/FAQRelatedArticles.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FAQRelatedArticles = () => {
  // Dữ liệu mẫu cho các bài viết liên quan
  const articles = [
    {
      id: 1,
      title: "Lịch sử và nguồn gốc của nghệ thuật thư pháp",
      excerpt: "Tìm hiểu về nguồn gốc và sự phát triển của nghệ thuật thư pháp qua các thời kỳ lịch sử...",
      image: "/images/articles/calligraphy-history.jpg",
      url: "/blog/calligraphy-history",
      date: "15/05/2023"
    },
    {
      id: 2,
      title: "5 kỹ thuật cơ bản cho người mới bắt đầu học thư pháp",
      excerpt: "Những kỹ thuật cần thiết giúp người mới làm quen với nghệ thuật viết chữ đẹp...",
      image: "/images/articles/beginner-techniques.jpg",
      url: "/blog/beginner-techniques",
      date: "02/06/2023"
    },
    {
      id: 3,
      title: "Cách chọn bút lông phù hợp cho từng phong cách thư pháp",
      excerpt: "Hướng dẫn chi tiết về các loại bút lông và cách lựa chọn phù hợp với phong cách thư pháp...",
      image: "/images/articles/brush-selection.jpg",
      url: "/blog/brush-selection",
      date: "20/06/2023"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Bài viết liên quan</h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex items-start space-x-3 p-2 hover:bg-amber-50 rounded-lg transition-colors duration-200">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
            </div>
            <div className="flex-1">
              <Link 
                to={article.url}
                className="font-medium text-gray-800 hover:text-amber-700 line-clamp-2"
              >
                {article.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
              <div className="text-xs text-amber-600 mt-1">{article.date}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <Link 
          to="/blog/category/calligraphy" 
          className="text-amber-600 hover:text-amber-800 text-sm font-medium hover:underline inline-flex items-center"
        >
          Xem tất cả bài viết
          <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
        </Link>
      </div>
    </div>
  );
};

export default FAQRelatedArticles;