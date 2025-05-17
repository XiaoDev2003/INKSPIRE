// src/components/layout/client/calligraphy/CalligraphyTechniques.jsx
import React from 'react';
import { Text } from '../../../../components/ui/ui';

const CalligraphyTechniques = () => {
  const techniques = [
    {
      id: 1,
      title: "Kỹ thuật cầm bút",
      description: "Cách cầm bút đúng là nền tảng của thư pháp đẹp. Bút nên được cầm thẳng đứng, với ngón cái và ngón trỏ giữ thân bút, các ngón còn lại hỗ trợ để tạo sự cân bằng và linh hoạt.",
      steps: [
        "Đặt bút vào giữa ngón cái và ngón trỏ",
        "Giữ bút ở góc 90 độ so với mặt giấy",
        "Giữ cổ tay thẳng và thả lỏng"
      ],
      imageSrc: "/images/techniques/brush-holding.jpg"
    },
    {
      id: 2,
      title: "Kỹ thuật nét cơ bản",
      description: "Thư pháp bắt đầu với việc thực hành các nét cơ bản. Nét ngang, nét sổ, nét phẩy và nét móc là những nét cơ bản cần thành thạo trước khi tiến đến viết chữ hoàn chỉnh.",
      steps: [
        "Luyện nét ngang từ trái sang phải",
        "Luyện nét sổ từ trên xuống dưới",
        "Kết hợp các nét cơ bản thành chữ đơn giản"
      ],
      imageSrc: "/images/techniques/basic-strokes.jpg"
    },
    {
      id: 3,
      title: "Kỹ thuật pha mực",
      description: "Mực có đặc tính khác nhau tùy vào độ đặc loãng. Việc pha mực đúng cách sẽ tạo ra những nét bút có độ đậm nhạt phù hợp với tác phẩm.",
      steps: [
        "Đổ nước vào nghiên mực",
        "Mài mực khối theo chuyển động tròn",
        "Kiểm tra độ đặc của mực trên giấy thử"
      ],
      imageSrc: "/images/techniques/ink-preparation.jpg"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <Text
        as="h2"
        size="3xl"
        weight="bold"
        color="text-amber-900"
        className="text-center mb-10"
        isHeading={true}
        line={true}
      >
        Kỹ thuật thư pháp cơ bản
      </Text>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Khám phá các kỹ thuật cơ bản để bắt đầu hành trình thư pháp của bạn. Việc nắm vững những kỹ thuật này sẽ giúp bạn tạo ra những tác phẩm thư pháp đẹp mắt và ý nghĩa.
        </p>

        <div className="space-y-12">
          {techniques.map((technique) => (
            <div key={technique.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img
                    src={technique.imageSrc}
                    alt={technique.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">{technique.title}</h3>
                  <p className="text-gray-600 mb-6">{technique.description}</p>

                  <h4 className="text-lg font-semibold text-amber-700 mb-3">Các bước thực hiện:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {technique.steps.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalligraphyTechniques;