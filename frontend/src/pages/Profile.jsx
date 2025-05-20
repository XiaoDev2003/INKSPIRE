/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserSidebar from '../components/layout/client/user/UserSidebar';
import UserDashboard from '../components/layout/client/user/UserDashboard';
import UserProfile from '../components/layout/client/user/UserProfile';
import ChangePassword from '../components/layout/client/user/ChangePassword';
import axiosClient from '../api/axiosClient';
import useAuth from '../hooks/useAuth';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, isLoggedIn, logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kiểm tra nếu người dùng chưa đăng nhập thì chuyển hướng về trang đăng nhập
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của người dùng
        const response = await axiosClient.get('/api/user/profile');
        console.log('User profile response:', response.data);

        // Xử lý dữ liệu người dùng từ API
        let userData = null;
        if (response.data) {
          if (response.data.user) {
            userData = response.data.user;
          } else if (response.data.success && response.data.data) {
            userData = response.data.data;
          } else if (typeof response.data === 'object' && !response.data.error) {
            // Nếu response.data là một object và không có trường error, có thể đó là dữ liệu người dùng
            userData = response.data;
          }
        }

        if (userData) {
          console.log('Processed user data:', userData);
          setUser(userData);
        } else {
          // Nếu không lấy được từ API, sử dụng dữ liệu từ context auth
          console.log('Using auth context data:', authUser);
          setUser(authUser);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        // Nếu có lỗi, vẫn sử dụng dữ liệu từ context auth
        setUser(authUser);
        setError('Không thể tải thông tin chi tiết người dùng.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, navigate, authUser]);

  // Xử lý cập nhật thông tin người dùng
  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      // Gọi API đăng xuất
      await axiosClient.post('/api/logout');

      // Sử dụng context để đăng xuất
      logout();

      // Chuyển hướng về trang chủ
      navigate('/');
    } catch (err) {
      console.error('Lỗi khi đăng xuất:', err);
      // Vẫn chuyển hướng về trang chủ ngay cả khi có lỗi
      navigate('/');
    }
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Avatar và menu */}
        <div className="lg:w-1/4">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className="relative rounded-full overflow-hidden w-32 h-32 mb-4 border-4 border-gray-100 shadow-lg">
              <img
                src={user.avatar_url || '/public/logo.png'}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{user.first_name || ''} {user.last_name || ''}</h2>
            <p className="text-gray-600 mb-4">@{user.username}</p>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              <span className="text-red-600"><FaSignOutAlt /></span>
              <span>Đăng xuất</span>
            </button>
          </div>

          {/* Menu sidebar */}
          <UserSidebar onLogout={handleLogout} />
        </div>

        {/* Nội dung chính */}
        <div className="lg:w-3/4 mb-50">
          <Routes>
            <Route path="/dashboard" element={<UserDashboard user={user} />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/" element={<UserProfile user={user} onUpdateProfile={handleUpdateProfile} />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default Profile;