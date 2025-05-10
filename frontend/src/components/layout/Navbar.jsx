import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaSignInAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AccountMenu from "../common/AccountMenu";
import LoginModal from "../common/LoginModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calligraphySubMenuOpen, setCalligraphySubMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  
  // Kiểm tra thông tin đăng nhập từ localStorage khi component được tải
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedLoginStatus === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);
  
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    
    // Cập nhật state
    setIsLoggedIn(false);
    setUsername("");
    
    // Tải lại trang sau khi đăng xuất
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        {/* Desktop navbar */}
        <div className="hidden h-16 items-center justify-between md:flex">
          {/* Left Side - Sự kiện */}
          <div>
            <Link
              to="/events"
              className="flex items-center gap-2 rounded-md px-4 py-2 font-medium text-amber-800 transition-colors duration-200 hover:bg-amber-100"
              aria-label="Xem sự kiện"
            >
              <FaCalendarAlt />
              <span>Sự kiện</span>
            </Link>
          </div>

          {/* Center Menu with Home Icon in middle */}
          <ul className="flex items-center space-x-1 rounded-full bg-amber-50 px-4 py-2 shadow-sm">

            {/* Dropdown Thư pháp */}
            <li className="group relative">
              <Link
                to="/calligraphy"
                className="rounded-md px-3 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100 hover:text-amber-700"
              >
                Thư pháp
              </Link>

              {/* Dropdown menu on hover */}
              <ul className="invisible absolute left-0 z-10 mt-1 w-56 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <li>
                  <Link
                    to="/category/traditional"
                    className="block px-4 py-2 text-amber-900 hover:bg-amber-100"
                  >
                    Thư pháp Truyền thống
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/modern"
                    className="block px-4 py-2 text-amber-900 hover:bg-amber-100"
                  >
                    Thư pháp Hiện đại
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/handwriting"
                    className="block px-4 py-2 text-amber-900 hover:bg-amber-100"
                  >
                    Viết tay & Thiết kế
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/gallery"
                className="rounded-md px-3 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100 hover:text-amber-700"
              >
                Kho ảnh
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-amber-700 transition-colors duration-200 hover:bg-amber-200"
                aria-label="Trang chủ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="rounded-md px-3 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100 hover:text-amber-700"
              >
                Về chúng tôi
              </Link>
            </li>

            <li>
              <Link
                to="/feedbackandquestion"
                className="rounded-md px-3 py-2 text-amber-900 transition-colors duration-200 hover:bg-amber-100 hover:text-amber-700"
              >
                Câu hỏi
              </Link>
            </li>
          </ul>

          {/* Right Side - Đăng nhập hoặc Account Menu */}
          <div>
            {isLoggedIn ? (
              <AccountMenu username={username || "Người dùng"} onLogout={handleLogout} />
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-2 rounded-md bg-amber-100 px-4 py-2 font-medium text-amber-900 transition-colors duration-200 hover:bg-amber-200"
                aria-label="Đăng nhập tài khoản"
              >
                <FaSignInAlt />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile navbar */}
        <div className="flex h-16 items-center justify-between md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            className="rounded-md p-2 text-amber-900 focus-visible:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {isLoggedIn ? (
            <AccountMenu username={username || "Người dùng"} onLogout={handleLogout} />
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-1 text-amber-800 hover:text-amber-600"
              aria-label="Đăng nhập tài khoản"
            >
              <FaSignInAlt />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
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
            </ul>
          </div>
        )}
      </div>

      {/* Modal đăng nhập */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLogin={(user) => {
          // Lưu thông tin đăng nhập vào localStorage
          localStorage.setItem('username', user);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Cập nhật state
          setUsername(user);
          setIsLoggedIn(true);
        }}
      />
    </nav>
  );
};

export default Navbar;
