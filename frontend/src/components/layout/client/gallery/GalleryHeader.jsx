// src/components/layout/client/gallery/GalleryHeader.jsx
import React from 'react';

const GalleryHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">Thư viện Thư Pháp</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Khám phá bộ sưu tập các tác phẩm thư pháp đẹp mắt từ những nghệ sĩ tài năng.
        Mỗi tác phẩm đều mang một thông điệp và cảm xúc riêng, được thể hiện qua những nét bút tinh tế.
      </p>
      <div className="mt-6">
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full inline-flex items-center transition-colors duration-300 shadow-md hover:shadow-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Đóng góp tác phẩm
        </button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-full inline-flex items-center transition-colors duration-300 border border-gray-300 shadow-sm hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Xem tất cả
        </button>
      </div>
    </div>
  );
};

export default GalleryHeader;