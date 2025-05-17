import React from 'react';
import { Text } from '../../../ui/ui';

const AboutHistory = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Thành lập Inkspire',
      description: 'Inkspire được thành lập bởi nhóm những người đam mê thư pháp với mục tiêu tạo ra một nền tảng kết nối cộng đồng.',
      icon: 'fa-solid fa-flag'
    },
    {
      year: '2019',
      title: 'Ra mắt nền tảng trực tuyến',
      description: 'Phiên bản đầu tiên của website Inkspire được ra mắt, cung cấp các bài viết và hướng dẫn về thư pháp.',
      icon: 'fa-solid fa-rocket'
    },
    {
      year: '2020',
      title: 'Mở rộng cộng đồng',
      description: 'Cộng đồng Inkspire đạt mốc 10,000 thành viên, tổ chức các sự kiện trực tuyến đầu tiên về thư pháp.',
      icon: 'fa-solid fa-users'
    },
    {
      year: '2021',
      title: 'Hợp tác quốc tế',
      description: 'Bắt đầu các dự án hợp tác với các nghệ nhân thư pháp và tổ chức văn hóa quốc tế.',
      icon: 'fa-solid fa-handshake'
    },
    {
      year: '2022',
      title: 'Phát triển ứng dụng di động',
      description: 'Ra mắt ứng dụng di động Inkspire, giúp người dùng dễ dàng tiếp cận nội dung thư pháp mọi lúc mọi nơi.',
      icon: 'fa-solid fa-mobile-screen'
    },
    {
      year: '2023',
      title: 'Mở rộng dịch vụ',
      description: 'Triển khai các khóa học trực tuyến và dịch vụ tư vấn thiết kế thư pháp cho cá nhân và doanh nghiệp.',
      icon: 'fa-solid fa-graduation-cap'
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <Text
        as="h2"
        size="2xl"
        weight="bold"
        color="text-gray-800"
        className="mb-8"
        isHeading={true}
        line={true}
      >
        Lịch sử phát triển
      </Text>
      <p className="text-gray-600 mb-8">
        Hành trình của Inkspire là câu chuyện về niềm đam mê, sự kiên trì và không ngừng đổi mới.
        Cùng nhìn lại những cột mốc quan trọng trong quá trình phát triển của chúng tôi.
      </p>

      <div className="relative border-l-2 border-amber-500 pl-8 ml-4 space-y-10">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative">
            {/* Dot on timeline */}
            <div className="absolute -left-[41px] bg-amber-500 rounded-full w-6 h-6 flex items-center justify-center">
              <i className={`${milestone.icon} text-white text-xs`}></i>
            </div>

            {/* Content */}
            <div className="bg-amber-50 p-4 rounded-md hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <span className="text-amber-700 font-bold mr-3">{milestone.year}</span>
                <h3 className="font-medium text-gray-800">{milestone.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Và hành trình của chúng tôi vẫn đang tiếp tục với nhiều dự định thú vị trong tương lai...
        </p>
      </div>
    </div>
  );
};

export default AboutHistory;