import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaUsers,
  FaList,
  FaFont,
  FaImages,
  FaComments,
  FaQuestionCircle,
  FaChartBar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'admin') {
      navigate('/auth/login');
      return;
    }
    setUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  const menuItems = [
    { path: '/admin', icon: <FaHome />, label: 'Trang chủ' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Quản lý người dùng' },
    { path: '/admin/categories', icon: <FaList />, label: 'Danh mục thư pháp' },
    { path: '/admin/items', icon: <FaFont />, label: 'Font chữ thư pháp' },
    { path: '/admin/gallery', icon: <FaImages />, label: 'Thư viện hình ảnh' },
    { path: '/admin/comments', icon: <FaComments />, label: 'Bình luận' },
    { path: '/admin/feedback', icon: <FaComments />, label: 'Phản hồi' },
    { path: '/admin/faq', icon: <FaQuestionCircle />, label: 'Câu hỏi thường gặp' },
    { path: '/admin/statistics', icon: <FaChartBar />, label: 'Thống kê' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-amber-800 text-white transition-all duration-300 ease-in-out hidden md:block`}
      >
        <div className="p-4 flex items-center justify-between">
          {/* Logo full width khi mở sidebar */}
          <div className={`flex items-center w-full ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none ml-2"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="px-4 mt-2 mb-4">
          <div className="w-full h-0.5 bg-amber-700 rounded"></div>
        </div>

        <nav className="mt-2 px-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-amber-900'
                      : 'hover:bg-amber-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && <span className="ml-4">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-200 hover:text-white transition-colors w-full"
          >
            <span className="flex items-center p-2 rounded-md hover:bg-red-800">
              <FaSignOutAlt />
              {sidebarOpen && <span className="ml-4">Đăng xuất</span>}
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-20 bg-amber-600 text-white p-2 rounded-md"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-64 h-full bg-amber-800 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center w-full justify-center">
                  <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="px-4 mt-2 mb-4">
                <div className="w-full h-0.5 bg-amber-700 rounded"></div>
              </div>

              <nav className="mt-2 px-2">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-amber-900'
                            : 'hover:bg-amber-700'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="ml-4">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="absolute bottom-6 left-0 w-full px-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-200 hover:text-white transition-colors w-full"
                >
                  <span className="flex items-center p-2 rounded-md hover:bg-red-800 w-full">
                    <FaSignOutAlt />
                    <span className="ml-4">Đăng xuất</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="p-4 bg-white shadow-sm flex justify-end items-center">
          {user && (
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Xin chào, {user.username}</span>
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                {user.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          )}
        </div>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;