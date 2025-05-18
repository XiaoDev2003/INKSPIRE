import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBell, FaSearch, FaUser, FaCog, FaTimes } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import axiosClient from '../../../api/axiosClient';
import { AuthContext } from '../../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { user: authUser, isAdmin, logout } = useContext(AuthContext);

  // Sử dụng thông tin từ AuthContext thay vì kiểm tra lại
  useEffect(() => {
    // Nếu đã có thông tin người dùng từ AuthContext, sử dụng nó
    if (authUser) {
      console.log('AdminLayout - Sử dụng thông tin người dùng từ AuthContext');
      setUser(authUser);
    } else if (!authUser) {
      // Chỉ chuyển hướng khi không có người dùng
      console.log('AdminLayout - Không có thông tin người dùng trong AuthContext');
      // Không hiển thị thông báo "Không tìm thấy thông tin đăng nhập" nữa
      // vì ProtectedRoute đã xử lý việc chuyển hướng
    }
  }, [authUser]);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (authUser && !isAdmin) {
      console.log('AdminLayout - Người dùng không có quyền admin');
      navigate('/');
    }
  }, [authUser, isAdmin, navigate]);



  // Xử lý đăng xuất
  const handleLogout = () => {
    // Sử dụng logout từ AuthContext
    logout();
    navigate('/');
  };

  // Dữ liệu thông báo mẫu
  const notifications = [
    { id: 1, text: 'Có 5 người dùng mới đăng ký', time: '5 phút trước', read: false },
    { id: 2, text: 'Có 3 bình luận mới cần duyệt', time: '30 phút trước', read: false },
    { id: 3, text: 'Cập nhật hệ thống hoàn tất', time: '2 giờ trước', read: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side - Toggle button & Search */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-amber-600 focus:outline-none flex items-center justify-center"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>

              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Right side - Notifications & User */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setDropdownOpen(false);
                  }}
                  className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-full relative focus:outline-none"
                  aria-label="Thông báo"
                >
                  <FaBell />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Dropdown thông báo */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200" style={{ position: 'absolute' }}>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">Thông báo</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${!notification.read ? 'bg-amber-50' : ''}`}
                          >
                            <p className="text-sm text-gray-800">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-600">Không có thông báo mới</div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <button className="text-sm text-amber-600 hover:text-amber-800">Xem tất cả thông báo</button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="Tài khoản"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{user?.username ? user.username.charAt(0).toUpperCase() : 'A'}</span>
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.username || 'Admin'}
                  </span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200" style={{ position: 'absolute' }}>
                    <a
                      href="#profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center"
                    >
                      <FaUser className="mr-2" /> Hồ sơ cá nhân
                    </a>
                    <a
                      href="#settings"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center"
                    >
                      <FaCog className="mr-2" /> Cài đặt
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Trang quản trị</h1>
              <div className="text-sm text-gray-500 mt-1">Quản lý nội dung và người dùng của Inkspire</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Inkspire Admin. Bản quyền thuộc về Inkspire.</p>
        </footer>
      </div>

      {/* Overlay to close dropdowns when clicking outside */}
      {(dropdownOpen || notificationsOpen) && (
        <div
          className="fixed inset-0 backdrop-blur-sm opacity-30"
          style={{ position: 'absolute' }}
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(false);
            setNotificationsOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;