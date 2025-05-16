import React from 'react';
import { Link } from 'react-router-dom';

const UnderDevelopment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-amber-600 mb-4">Đang phát triển</h1>
      <p className="text-lg text-gray-700 mb-6">Chức năng này đang trong quá trình phát triển.</p>
      <p className="text-md text-gray-600 mb-6">Vui lòng quay lại sau.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default UnderDevelopment;