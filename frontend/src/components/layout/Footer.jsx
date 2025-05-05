import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
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
  return (
    <footer className="relative overflow-hidden bg-indigo-950 text-white">
      {/* Nền giả giấy cổ / gỗ thư pháp */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <img
          src="/images/paper-bg.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
          {/* Logo & Mô tả ngắn */}
          <div className="flex flex-col items-center text-center">
            <img
              src="./logo_white.png"
              alt="Logo Inkspire"
              className="mb-4 w-32 object-contain drop-shadow-lg"
            />
            <p className="mb-6 text-sm leading-relaxed tracking-wide text-indigo-200 italic">
              Nơi lưu giữ và phát triển nghệ thuật thư pháp truyền thống với
              trái tim yêu cái đẹp.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-amber-300 transition-colors duration-300 hover:text-white"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-amber-300 transition-colors duration-300 hover:text-white"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-amber-300 transition-colors duration-300 hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Liên kết hữu ích */}
          <div>
            <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-semibold text-white">
              Menu
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="block text-sm font-medium text-indigo-200 transition-colors duration-300 hover:text-amber-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-semibold text-white">
              Thông tin
            </h3>
            <ul className="space-y-4">
              {contactInfo.map(({ icon, text }, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-1 mr-3 text-amber-400">
                    {renderIcon(icon)}
                  </span>
                  <span className="text-sm text-indigo-200">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Marquee thư pháp - có thể nhấp vào từng mục */}
        <div className="mt-12 overflow-hidden border-t border-indigo-900 pt-6">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            <Link
              to="/traditional"
              className="mx-4 inline-block text-sm text-amber-300 italic transition-colors duration-300 hover:text-white"
            >
              Thư pháp truyền thống
            </Link>
            <Link
              to="/modern"
              className="mx-4 inline-block  text-sm text-amber-300 italic transition-colors duration-300 hover:text-white"
            >
              Thư pháp hiện đại
            </Link>
            <Link
              to="/gallery"
              className="mx-4 inline-block  text-sm text-amber-300 italic transition-colors duration-300 hover:text-white"
            >
              Triển lãm thư pháp
            </Link>
            <Link
              to="/about"
              className="mx-4 inline-block text-sm text-amber-300 italic transition-colors duration-300 hover:text-white"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/contact"
              className="mx-4 inline-block text-sm text-amber-300 italic transition-colors duration-300 hover:text-white"
            >
              Liên hệ
            </Link>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-8 text-center text-sm text-indigo-400">
          © {new Date().getFullYear()} Inkspire. All rights reserved.
        </div>
      </div>

      {/* Trang trí viền dưới kiểu thư pháp */}
      <div className="absolute right-0 bottom-0 left-0 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
    </footer>
  );
};

export default Footer;
