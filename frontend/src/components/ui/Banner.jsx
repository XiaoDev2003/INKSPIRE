// src/components/Banner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({
  title = "Khám phá nghệ thuật thư pháp",
  subtitle = "Học viết chữ truyền thống & cảm nhận nét đẹp văn hóa Á Đông",
  ctaText = "Khóa học dành cho bạn",
  ctaLink = "/courses",
  imageSrc = "/images/banner-calligraphy.jpg"
}) => {
  return (
    <section className="bg-white py-12">
      {/* Container căn giữa */}
      <div className="container mx-auto px-4 md:px-6">
        {/* Nội dung nằm trong banner - có border nhẹ */}
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hình ảnh banner */}
          <div className="w-full h-64 sm:h-72 md:h-96 relative overflow-hidden">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nội dung bên dưới hình ảnh */}
          <div className="p-6 md:p-8 space-y-6 bg-gray-100 bg-opacity-60 backdrop-blur-sm">
            {/* Tiêu đề */}
            <h1
              className="text-3xl md:text-6xl font-bold text-center text-amber-900 leading-tight max-w-2xl mx-auto"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              {title}
            </h1>

            {/* Mô tả ngắn */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* Nút hành động chính */}
            <div className="flex justify-center mt-4">
              <Link
                to={ctaLink}
                className="inline-flex items-center px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium rounded-md transition-colors duration-300"
              >
                {ctaText} <span className="ml-2">🡒</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;