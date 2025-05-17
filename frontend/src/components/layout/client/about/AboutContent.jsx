// src/components/layout/client/about/AboutContent.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Dùng lại component Banner đã có sẵn
import { Banner } from '../../../common/common'; // Import từ file common.js
import { Text } from '../../../ui/ui';

import AboutTeam from './AboutTeam';
import AboutHistory from './AboutHistory';

const AboutContent = () => {
  return (
    <>
      {/* Dùng lại component Banner */}
      <Banner
        title=""
        subtitle="Nơi kết nối đam mê thư pháp & nghệ thuật viết chữ truyền thống"
        ctaText="Khám phá khóa học"
        ctaLink="/courses"
        imageSrc="./banner/about.png"
      />

      {/* Phần sứ mệnh */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Text
          as="h2"
          size="2xl"
          weight="bold"
          color="text-gray-800"
          className="text-center mb-6"
          isHeading={true}
          line={true}
        >
          Sứ mệnh của chúng tôi
        </Text>
        <p className="text-gray-600 leading-relaxed mb-4">
          Inkspire được thành lập với mục tiêu bảo tồn và phát triển nghệ thuật thư pháp Việt Nam.
          Chúng tôi tin rằng thư pháp không chỉ là một nghệ thuật viết chữ mà còn là cầu nối văn hóa giữa quá khứ và hiện tại.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Thông qua nền tảng của mình, chúng tôi mong muốn tạo ra một cộng đồng nơi những người yêu thích thư pháp có thể học hỏi, chia sẻ và phát triển đam mê.
        </p>

        {/* Grid thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-amber-50 p-5 rounded-md text-center hover:bg-amber-100 transition-all duration-300 transform hover:scale-105">
            <div className="text-amber-700 text-3xl mb-2">
              <i className="fa-solid fa-pen-nib"></i>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Nghệ thuật</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Khám phá vẻ đẹp của nghệ thuật thư pháp truyền thống
            </p>
          </div>

          <div className="bg-amber-50 p-5 rounded-md text-center hover:bg-amber-100 transition-all duration-300 transform hover:scale-105">
            <div className="text-amber-700 text-3xl mb-2">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Cộng đồng</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kết nối với những người cùng đam mê thư pháp Á Đông
            </p>
          </div>

          <div className="bg-amber-50 p-5 rounded-md text-center hover:bg-amber-100 transition-all duration-300 transform hover:scale-105">
            <div className="text-amber-700 text-3xl mb-2">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Học tập</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tiếp cận tài liệu và khóa học chuyên sâu về thư pháp
            </p>
          </div>
        </div>
      </div>

      {/* Phần lịch sử */}
      <AboutHistory />

      {/* Phần đội ngũ */}
      <AboutTeam />

      {/* Phần liên hệ */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Text
          as="h2"
          size="2xl"
          weight="bold"
          color="text-gray-800"
          className="text-center mb-8"
          isHeading={true}
          line={true}
        >
          Liên hệ với chúng tôi
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến và câu hỏi từ bạn. Vui lòng chọn một trong các kênh dưới đây để liên hệ.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-600">
                <i className="fa-solid fa-envelope text-amber-700 mr-3 mt-1"></i>
                <span>
                  Email: <a href="mailto:contact@inkspire.vn" className="text-amber-700 hover:underline">contact@inkspire.vn</a>
                </span>
              </li>
              <li className="flex items-start text-gray-600">
                <i className="fa-solid fa-phone text-amber-700 mr-3 mt-1"></i>
                <span>Điện thoại: (024) 1234 5678</span>
              </li>
              <li className="flex items-start text-gray-600">
                <i className="fa-solid fa-location-dot text-amber-700 mr-3 mt-1"></i>
                <span>Địa chỉ: 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Giờ làm việc</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>Thứ Hai - Thứ Sáu:</span>
                <span>8:00 - 17:30</span>
              </li>
              <li className="flex justify-between">
                <span>Thứ Bảy:</span>
                <span>9:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span>Chủ Nhật:</span>
                <span>Đóng cửa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;