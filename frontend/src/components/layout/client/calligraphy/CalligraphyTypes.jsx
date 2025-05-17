// src/components/layout/client/calligraphy/CalligraphyTypes.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/ui/ui';

const CalligraphyTypes = ({ types }) => {
  return (
    <>
      <Text
        as="h2"
        size="3xl"
        weight="bold"
        color="text-amber-900"
        className="mb-8"
        isHeading={true}
        line
      >
        Các kiểu thư pháp phổ biến
      </Text>
      <Text
        as="p"
        size="base"
        color="text-gray-600"
        className="mb-12"
      >
        Khám phá các phong cách thư pháp đa dạng từ truyền thống đến hiện đại, mỗi phong cách đều mang đến những nét đẹp và ý nghĩa riêng biệt.
      </Text>

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
              <Text
                as="h3"
                size="xl"
                weight="bold"
                color="text-amber-800"
                className="mb-2"
                isHeading={true}
              >
                {type.title}
              </Text>
              <Text
                as="p"
                size="base"
                color="text-gray-600"
                className="mb-4"
              >
                {type.description}
              </Text>
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
    </>
  );
};

export default CalligraphyTypes;