import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUsers,
  FaList,
  FaFont,
  FaImages,
  FaComments,
  FaQuestionCircle,
  FaChartBar,
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaHome,
  FaTachometerAlt,
  FaCog,
  FaArrowLeft,
  FaEye
} from 'react-icons/fa';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Tổng quan' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Người dùng' },
    { path: '/admin/categories', icon: <FaList />, label: 'Danh mục' },
    { path: '/admin/items', icon: <FaFont />, label: 'Font chữ' },
    { path: '/admin/gallery', icon: <FaImages />, label: 'Thư viện ảnh' },
    { path: '/admin/comments', icon: <FaComments />, label: 'Bình luận' },
    { path: '/admin/feedback', icon: <FaComments />, label: 'Phản hồi' },
    { path: '/admin/faq', icon: <FaQuestionCircle />, label: 'FAQ' },
    { path: '/admin/statistics', icon: <FaChartBar />, label: 'Thống kê' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Cài đặt' },
  ];

  // Phân loại menu items thành các nhóm
  const menuGroups = {
    main: menuItems.slice(0, 1),
    content: menuItems.slice(1, 5),
    interaction: menuItems.slice(5, 8),
    system: menuItems.slice(8),
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-amber-800 to-amber-900 text-white transition-all duration-300 ease-in-out hidden md:block fixed left-0 top-0 z-30 shadow-lg overflow-y-auto h-screen`}
      >
        <div className="p-4">
          <div className="w-full">
            <img src="/logo_white.png" alt="Inkspire" className="h-18 w-full object-contain" />
          </div>
        </div>

        <div className="px-4 mt-2 mb-6">
          <div className="w-full h-0.5 bg-amber-700/50 rounded"></div>
        </div>

        <div className="px-3 py-2 overflow-y-auto">
          <nav className="space-y-6">
            {/* Menu chính */}
            <div>
              {sidebarOpen && <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Chính</h3>}
              <ul className="space-y-1">
                {menuGroups.main.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu nội dung */}
            <div>
              {sidebarOpen && <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Nội dung</h3>}
              <ul className="space-y-1">
                {menuGroups.content.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu tương tác */}
            <div>
              {sidebarOpen && <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Tương tác</h3>}
              <ul className="space-y-1">
                {menuGroups.interaction.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu hệ thống */}
            <div>
              {sidebarOpen && <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Hệ thống</h3>}
              <ul className="space-y-1">
                {menuGroups.system.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Phần nút quay về trang chính đã được loại bỏ */}
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Mobile */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-30 w-72 sm:w-64 bg-gradient-to-b from-amber-800 to-amber-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="w-full">
            <img src="/logo_white.png" alt="Inkspire" className="h-10 w-full object-contain" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-amber-200 hover:text-white p-2 rounded-full hover:bg-amber-700/50"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 mt-2 mb-6">
          <div className="w-full h-0.5 bg-amber-700/50 rounded"></div>
        </div>

        <div className="px-3 py-2 overflow-y-auto flex-1">
          <nav className="space-y-6">
            {/* Menu chính */}
            <div>
              <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Chính</h3>
              <ul className="space-y-1">
                {menuGroups.main.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu nội dung */}
            <div>
              <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Nội dung</h3>
              <ul className="space-y-1">
                {menuGroups.content.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu tương tác */}
            <div>
              <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Tương tác</h3>
              <ul className="space-y-1">
                {menuGroups.interaction.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu hệ thống */}
            <div>
              <h3 className="text-xs uppercase text-amber-300 font-semibold mb-2 px-3">Hệ thống</h3>
              <ul className="space-y-1">
                {menuGroups.system.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Phần nút quay về trang chính và đăng xuất đã được loại bỏ */}
      </div>
    </>
  );
};

// Component MenuItem để hiển thị từng mục trong menu
const MenuItem = ({ item, isActive, sidebarOpen, onClick }) => {
  return (
    <li>
      <Link
        to={item.path}
        className={`flex items-center py-2 px-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-amber-700 text-white' : 'text-amber-100 hover:bg-amber-700/50'} ${!sidebarOpen ? 'justify-center' : ''}`}
        onClick={onClick}
      >
        <span className={`text-lg ${isActive ? 'text-white' : 'text-amber-300'}`}>{item.icon}</span>
        {sidebarOpen && <span className="ml-3">{item.label}</span>}
      </Link>
    </li>
  );
};

export default AdminSidebar;