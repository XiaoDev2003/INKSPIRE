// src/components/layout/client/calligraphy/CalligraphyCategory.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CalligraphyCategory = () => {
  // Dữ liệu cho các loại thư pháp
  const categories = [
    {
      id: 1,
      title: "Thư pháp truyền thống",
      description: "Nghệ thuật viết chữ truyền thống với bút lông và mực Tàu, thể hiện vẻ đẹp của văn hóa Á Đông.",
      imageSrc: "/images/calligraphy-type-1.jpg",
      link: "/category/traditional"
    },
    {
      id: 2,
      title: "Thư pháp hiện đại",
      description: "Kết hợp giữa kỹ thuật truyền thống và phong cách đương đại, tạo nên những tác phẩm độc đáo và sáng tạo.",
      imageSrc: "/images/calligraphy-type-2.jpg",
      link: "/category/modern"
    },
    {
      id: 3,
      title: "Viết tay thiết kế",
      description: "Nghệ thuật viết tay kết hợp với thiết kế hiện đại, tạo nên những tác phẩm độc đáo và cá nhân hóa.",
      imageSrc: "/images/calligraphy-type-3.jpg",
      link: "/category/handwriting"
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Các danh mục thư pháp</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Khám phá các phong cách thư pháp đa dạng từ truyền thống đến hiện đại, mỗi phong cách đều mang đến những nét đẹp và ý nghĩa riêng biệt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.imageSrc} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link 
                  to={category.link} 
                  className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                >
                  Xem danh mục
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalligraphyCategory;