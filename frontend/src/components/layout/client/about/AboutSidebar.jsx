import React from 'react';

const AboutSidebar = () => {
  const companyInfo = [
    { title: "Giới thiệu", content: "Inkspire là nền tảng kết nối đam mê thư pháp với thế giới hiện đại." },
    { title: "Tầm nhìn", content: "Trở thành nền tảng hàng đầu về thư pháp tại Việt Nam và Đông Nam Á." },
    { title: "Sứ mệnh", content: "Bảo tồn & phát triển nghệ thuật thư pháp truyền thống." },
    { title: "Giá trị cốt lõi", content: "Sáng tạo - Tôn trọng truyền thống - Chia sẻ kiến thức - Xây dựng cộng đồng" },
    { title: "Lịch sử", content: "Thành lập năm 2018 bởi nhóm những người yêu thư pháp Việt Nam." },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden">
      {/* Logo full-width */}
      <div className="mb-4 bg-gradient-to-br from-amber-50 to-gray-100 p-4">
        <img
          src="./logo.png"
          alt="Logo Inkspire"
          className="w-full h-auto object-contain rounded-lg shadow-sm"
          style={{ maxHeight: '200px' }}
        />
      </div>

      {/* Tiêu đề phụ */}
      <div className="px-6 pb-2">
        <h3 className="text-xl font-serif font-bold text-gray-800 text-center">Khám phá Inkspire</h3>
      </div>

      {/* Nội dung chính sidebar */}
      <div className="p-6 flex-grow overflow-y-auto space-y-6">
        {companyInfo.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <h4 className="font-semibold text-amber-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Phần liên hệ cố định dưới chân sidebar */}
      <div className="p-6 bg-amber-50 rounded-b-lg border-t border-amber-100">
        <h4 className="font-medium text-amber-800 mb-2">Liên hệ hỗ trợ</h4>
        <p className="text-sm text-gray-600 mb-4">Có câu hỏi? Hãy gửi ngay:</p>
        <div className="space-y-2">
          <a href="mailto:support@inkspire.vn" className="flex items-center text-sm text-amber-700 hover:text-amber-900 hover:bg-amber-100 p-2 rounded transition-colors duration-200">
            <i className="fa-solid fa-envelope text-lg mr-3"></i>
            <span>support@inkspire.vn</span>
          </a>
          <a href="tel:+842412345678" className="flex items-center text-sm text-amber-700 hover:text-amber-900 hover:bg-amber-100 p-2 rounded transition-colors duration-200">
            <i className="fa-solid fa-phone text-lg mr-3"></i>
            <span>(024) 1234 5678</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSidebar;