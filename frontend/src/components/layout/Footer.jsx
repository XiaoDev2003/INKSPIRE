import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

// Dữ liệu liên kết hữu ích
const usefulLinks = [
  { name: "Trang chủ", path: "/" },
  { name: "Thư pháp truyền thống", path: "/traditional" },
  { name: "Thư pháp hiện đại", path: "/modern" },
  { name: "Gallery", path: "/gallery" },
  { name: "Liên hệ", path: "/contact" },
];

// Dữ liệu thông tin liên hệ
const contactInfo = [
  { icon: "mail", text: "inkspire@example.com" },
  { icon: "phone", text: "+84 123 456 789" },
  { icon: "map", text: "Hà Nội, Việt Nam" },
];

// Mapping icon từ react-icons
const iconMap = {
  mail: <FaRegEnvelope />,
  phone: <FaPhoneAlt />,
  map: <FaMapMarkerAlt />,
};

const renderIcon = (iconName) => iconMap[iconName] || null;

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState("Chưa xác định");
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat= ${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            setUserLocation(data.display_name || "Không xác định được địa điểm");
          } catch (error) {
            console.error("Lỗi geocoding:", error);
            setUserLocation("Không thể lấy tên địa điểm");
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setShowPermissionPrompt(true);
              break;
            default:
              setUserLocation("Không thể xác định vị trí");
              break;
          }
        },
        { timeout: 10000 }
      );
    } else {
      setUserLocation("Trình duyệt không hỗ trợ định vị");
    }
  }, []);

  // Format ngày tháng theo tiếng Việt
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  // Format thời gian
  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN');
  };

  // Yêu cầu cấp quyền vị trí lại
  const requestLocation = () => {
    setShowPermissionPrompt(false);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat= ${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          setUserLocation(data.display_name || "Không xác định được địa điểm");
        } catch (error) {
          console.error("Lỗi geocoding:", error);
          setUserLocation("Không thể lấy tên địa điểm");
        }
      },
      (error) => {
        console.error("Người dùng vẫn chưa cho phép truy cập vị trí.");
        alert("Vui lòng bật dịch vụ định vị trong cài đặt trình duyệt.");
      }
    );
  };

  return (
    <footer className="relative overflow-hidden bg-indigo-950 text-white">
      {/* Nền giả giấy cổ */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <img src="/images/paper-bg.png" alt="Background" className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
          {/* Logo & Mô tả ngắn */}
          <div className="flex flex-col items-center text-center">
            <img src="./logo_white.png" alt="Logo Inkspire" className="mb-4 w-32 object-contain drop-shadow-lg" />
            <p className="mb-6 text-sm leading-relaxed tracking-wide text-indigo-200 italic">
              Nơi lưu giữ và phát triển nghệ thuật thư pháp truyền thống với trái tim yêu cái đẹp.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-amber-300 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-amber-300 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-amber-300 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Liên kết hữu ích */}
          <div>
            <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-semibold text-white">Menu</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="block text-sm font-medium text-indigo-200 hover:text-amber-300 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-semibold text-white">Thông tin</h3>
            <ul className="space-y-4">
              {contactInfo.map(({ icon, text }, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 mr-3 text-amber-400">{renderIcon(icon)}</span>
                  <span className="text-sm text-indigo-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hiển thị thời gian và vị trí - Marquee hiệu ứng cuộn */}
        <div className="mt-12 overflow-hidden border-t border-indigo-900 pt-6">
          <div className="flex whitespace-nowrap text-sm text-amber-300 italic">
            <div className="marquee flex gap-8">
              <div className="inline-flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="inline-flex items-center">
                <FaClock className="mr-2" />
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="inline-flex items-center">
                <FaMapMarkedAlt className="mr-2" />
                <span>{userLocation}</span>
              </div>
            </div>

            {/* Lặp lại để tạo hiệu ứng liền mạch */}
            <div className="marquee flex gap-8" aria-hidden="true">
              <div className="inline-flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="inline-flex items-center">
                <FaClock className="mr-2" />
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="inline-flex items-center">
                <FaMapMarkedAlt className="mr-2" />
                <span>{userLocation}</span>
              </div>
            </div>
          </div>

          {/* Thông báo yêu cầu cấp quyền vị trí */}
          {showPermissionPrompt && (
            <div className="mt-4 text-center">
              <button
                onClick={requestLocation}
                className="rounded bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                Cho phép xác định vị trí
              </button>
            </div>
          )}
        </div>

        {/* Bản quyền */}
        <div className="mt-8 text-center text-sm text-indigo-400">
          © {new Date().getFullYear()} Inkspire. All rights reserved.
        </div>
      </div>

      {/* Trang trí viền dưới kiểu thư pháp */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
    </footer>
  );
};

export default Footer;