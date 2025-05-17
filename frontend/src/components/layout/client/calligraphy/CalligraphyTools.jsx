// src/components/layout/client/calligraphy/CalligraphyTools.jsx
import React from "react";
import { Text } from "../../../../components/ui/ui";

const CalligraphyTools = () => {
  const tools = [
    {
      id: 1,
      name: "Bút lông truyền thống",
      description:
        "Bút lông truyền thống được làm từ lông động vật, thường là lông thỏ hoặc lông dê, với thân bút làm từ tre hoặc gỗ.",
      imageSrc: "/images/tools/traditional-brush.jpg",
    },
    {
      id: 2,
      name: "Mực Tàu",
      description:
        "Mực Tàu truyền thống được làm từ muội than, keo và hương liệu, tạo ra màu đen sâu thẳm và bền màu.",
      imageSrc: "/images/tools/ink.jpg",
    },
    {
      id: 3,
      name: "Giấy Xuyến Chỉ",
      description:
        "Loại giấy đặc biệt có khả năng hút mực tốt, tạo ra hiệu ứng lan tỏa đặc trưng cho thư pháp Á Đông.",
      imageSrc: "/images/tools/rice-paper.jpg",
    },
    {
      id: 4,
      name: "Nghiên Mực",
      description:
        "Dụng cụ để mài mực khối thành mực nước, thường được làm từ đá và có thiết kế tinh xảo.",
      imageSrc: "/images/tools/ink-stone.jpg",
    },
  ];

  return (
    <>
      <Text
        as="h2"
        size="3xl"
        weight="bold"
        color="text-amber-900"
        className="mb-10 text-center"
        isHeading={true}
        line={true}
      >
        Công cụ thư pháp
      </Text>

      <Text as="p" size="base" color="text-gray-600" className="mb-12">
        Khám phá các công cụ cơ bản và thiết yếu để bắt đầu hành trình thư pháp
        của bạn. Mỗi công cụ đều có vai trò riêng trong việc tạo nên những tác
        phẩm thư pháp đẹp mắt.
      </Text>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg md:flex-row"
          >
            <div className="h-48 overflow-hidden md:h-auto md:w-1/3">
              <img
                src={tool.imageSrc}
                alt={tool.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <h3 className="mb-2 text-xl font-bold text-amber-800">
                {tool.name}
              </h3>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CalligraphyTools;
