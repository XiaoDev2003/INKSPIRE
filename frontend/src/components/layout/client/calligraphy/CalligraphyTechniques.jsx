// src/components/layout/client/calligraphy/CalligraphyTechniques.jsx
import React from "react";
import { Text } from "../../../../components/ui/ui";

const CalligraphyTechniques = () => {
  const techniques = [
    {
      id: 1,
      title: "Kỹ thuật cầm bút",
      description:
        "Cách cầm bút đúng là nền tảng của thư pháp đẹp. Bút nên được cầm thẳng đứng, với ngón cái và ngón trỏ giữ thân bút, các ngón còn lại hỗ trợ để tạo sự cân bằng và linh hoạt.",
      steps: [
        "Đặt bút vào giữa ngón cái và ngón trỏ",
        "Giữ bút ở góc 90 độ so với mặt giấy",
        "Giữ cổ tay thẳng và thả lỏng",
      ],
      imageSrc: "/images/techniques/brush-holding.jpg",
    },
    {
      id: 2,
      title: "Kỹ thuật nét cơ bản",
      description:
        "Thư pháp bắt đầu với việc thực hành các nét cơ bản. Nét ngang, nét sổ, nét phẩy và nét móc là những nét cơ bản cần thành thạo trước khi tiến đến viết chữ hoàn chỉnh.",
      steps: [
        "Luyện nét ngang từ trái sang phải",
        "Luyện nét sổ từ trên xuống dưới",
        "Kết hợp các nét cơ bản thành chữ đơn giản",
      ],
      imageSrc: "/images/techniques/basic-strokes.jpg",
    },
    {
      id: 3,
      title: "Kỹ thuật pha mực",
      description:
        "Mực có đặc tính khác nhau tùy vào độ đặc loãng. Việc pha mực đúng cách sẽ tạo ra những nét bút có độ đậm nhạt phù hợp với tác phẩm.",
      steps: [
        "Đổ nước vào nghiên mực",
        "Mài mực khối theo chuyển động tròn",
        "Kiểm tra độ đặc của mực trên giấy thử",
      ],
      imageSrc: "/images/techniques/ink-preparation.jpg",
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
        Kỹ thuật thư pháp cơ bản
      </Text>

      <Text as="p" size="base" color="text-gray-600" className="mb-12">
        Khám phá các kỹ thuật cơ bản để bắt đầu hành trình thư pháp của bạn.
        Việc nắm vững những kỹ thuật này sẽ giúp bạn tạo ra những tác phẩm thư
        pháp đẹp mắt và ý nghĩa.
      </Text>

      <div className="space-y-12">
        {techniques.map((technique) => (
          <div
            key={technique.id}
            className="overflow-hidden rounded-lg bg-gray-50 p-6 shadow-md md:p-8"
          >
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={technique.imageSrc}
                  alt={technique.title}
                  className="h-64 w-full rounded-lg object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="mb-4 text-2xl font-bold text-amber-800">
                  {technique.title}
                </h3>
                <p className="mb-6 text-gray-600">{technique.description}</p>

                <h4 className="mb-3 text-lg font-semibold text-amber-700">
                  Các bước thực hiện:
                </h4>
                <ol className="list-inside list-decimal space-y-2 text-gray-700">
                  {technique.steps.map((step, index) => (
                    <li key={index} className="pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CalligraphyTechniques;