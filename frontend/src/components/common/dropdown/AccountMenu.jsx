import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaUserCircle, FaExchangeAlt } from 'react-icons/fa';

const AccountMenu = ({ username = 'Người dùng', onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        {/* Lời chào và tên người dùng */}
        <div className="hidden md:block text-amber-900 font-medium">
          Xin chào, {username}
        </div>
        
        {/* Avatar người dùng */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors duration-200"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaUserCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="h-4 w-4" />
              <span>Truy cập hồ sơ</span>
            </Link>
            
            <Link
              to="/switch-account"
              className="flex items-center gap-2 px-4 py-2 text-sm text-amber-900 hover:bg-amber-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <FaExchangeAlt className="h-4 w-4" />
              <span>Đổi tài khoản</span>
            </Link>
            
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-900 hover:bg-amber-100 text-left"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                if (onLogout) onLogout();
              }}
            >
              <FaSignOutAlt className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;