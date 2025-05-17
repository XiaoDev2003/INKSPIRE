import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import AccountMenu from '../../common/dropdown/AccountMenu';

const MobileUserMenu = ({ isLoggedIn, username, handleLogout, setLoginModalOpen }) => {
  return (
    <div>
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
  );
};

export default MobileUserMenu;