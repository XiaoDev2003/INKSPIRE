import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaUser, FaKey, FaSignOutAlt } from 'react-icons/fa';

const UserSidebar = ({ onLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Danh sách các mục trong sidebar
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaChartBar />,
      path: '/profile/dashboard'
    },
    {
      id: 'profile',
      label: 'Thông tin người dùng',
      icon: <FaUser />,
      path: '/profile'
    },
    {
      id: 'change-password',
      label: 'Đổi mật khẩu',
      icon: <FaKey />,
      path: '/profile/change-password'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <nav>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${currentPath === item.path ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`}
              >
                <span className="text-amber-600">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-100 text-left"
            >
              <span className="text-red-600"><FaSignOutAlt /></span>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;