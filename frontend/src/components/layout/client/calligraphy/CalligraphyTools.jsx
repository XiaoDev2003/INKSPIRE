// src/components/layout/client/calligraphy/CalligraphyTools.jsx
import React from 'react';

const CalligraphyTools = () => {
  const tools = [
    {
      id: 1,
      name: "Bút lông truyền thống",
      description: "Bút lông truyền thống được làm từ lông động vật, thường là lông thỏ hoặc lông dê, với thân bút làm từ tre hoặc gỗ.",
      imageSrc: "/images/tools/traditional-brush.jpg",
    },
    {
      id: 2,
      name: "Mực Tàu",
      description: "Mực Tàu truyền thống được làm từ muội than, keo và hương liệu, tạo ra màu đen sâu thẳm và bền màu.",
      imageSrc: "/images/tools/ink.jpg",
    },
    {
      id: 3,
      name: "Giấy Xuyến Chỉ",
      description: "Loại giấy đặc biệt có khả năng hút mực tốt, tạo ra hiệu ứng lan tỏa đặc trưng cho thư pháp Á Đông.",
      imageSrc: "/images/tools/rice-paper.jpg",
    },
    {
      id: 4,
      name: "Nghiên Mực",
      description: "Dụng cụ để mài mực khối thành mực nước, thường được làm từ đá và có thiết kế tinh xảo.",
      imageSrc: "/images/tools/ink-stone.jpg",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Công cụ thư pháp</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Khám phá các công cụ cơ bản và thiết yếu để bắt đầu hành trình thư pháp của bạn. Mỗi công cụ đều có vai trò riêng trong việc tạo nên những tác phẩm thư pháp đẹp mắt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div key={tool.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img
                  src={tool.imageSrc}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">{tool.name}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalligraphyTools;