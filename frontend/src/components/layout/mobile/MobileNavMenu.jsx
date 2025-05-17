import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MobileNavMenu = ({ mobileMenuOpen, calligraphySubMenuOpen, setCalligraphySubMenuOpen }) => {
  if (!mobileMenuOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="mt-2 border-t border-amber-200 pb-3 md:hidden"
    >
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="block rounded-md px-4 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100"
          >
            Trang Chủ
          </Link>
        </li>

        {/* Thư pháp (mobile) */}
        <li>
          <div className="flex items-center justify-between">
            <Link
              to="/calligraphy"
              className="block rounded-md px-4 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100"
            >
              Thư pháp
            </Link>
            <button
              onClick={() =>
                setCalligraphySubMenuOpen(!calligraphySubMenuOpen)
              }
              className="mr-4 text-amber-700"
            >
              {calligraphySubMenuOpen ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </button>
          </div>

          {/* Submenu */}
          {calligraphySubMenuOpen && (
            <ul className="space-y-1 pt-1 pl-6">
              <li>
                <Link
                  to="/category/traditional"
                  className="block rounded-md px-4 py-2 text-amber-800 hover:bg-amber-100"
                >
                  Truyền thống
                </Link>
              </li>
              <li>
                <Link
                  to="/category/modern"
                  className="block rounded-md px-4 py-2 text-amber-800 hover:bg-amber-100"
                >
                  Hiện đại
                </Link>
              </li>
              <li>
                <Link
                  to="/category/handwriting"
                  className="block rounded-md px-4 py-2 text-amber-800 hover:bg-amber-100"
                >
                  Viết tay & Thiết kế
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/gallery"
            className="block rounded-md px-4 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100"
          >
            Kho ảnh
          </Link>
        </li>

        <li>
          <Link
            to="/events"
            className="block rounded-md px-4 py-2 font-medium text-amber-900 transition-colors duration-200 hover:bg-amber-100"
          >
            Sự kiện
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="block rounded-md px-4 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100"
          >
            Về chúng tôi
          </Link>
        </li>

        <li>
          <Link
            to="/feedbackandquestion"
            className="block rounded-md px-4 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100"
          >
            Câu hỏi
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavMenu;