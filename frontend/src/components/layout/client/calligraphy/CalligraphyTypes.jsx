// src/components/layout/client/calligraphy/CalligraphyTypes.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CalligraphyTypes = ({ types }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Các kiểu thư pháp phổ biến</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Khám phá các phong cách thư pháp đa dạng từ truyền thống đến hiện đại, mỗi phong cách đều mang đến những nét đẹp và ý nghĩa riêng biệt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((type) => (
            <div key={type.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={type.imageSrc} 
                  alt={type.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <Link 
                  to={`/calligraphy/types/${type.id}`} 
                  className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalligraphyTypes;