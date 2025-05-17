/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserSidebar from '../components/layout/client/user/UserSidebar';
import UserDashboard from '../components/layout/client/user/UserDashboard';
import UserProfile from '../components/layout/client/user/UserProfile';
import ChangePassword from '../components/layout/client/user/ChangePassword';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dữ liệu mẫu cho người dùng khi chưa có API
  const defaultUser = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'support@profilepress.net',
    website: 'https://profilepress.net',
    facebook: 'https://www.facebook.com/profilepress',
    twitter: 'https://twitter.com/profilepress',
    avatar_url: null,
    gender: 'male'
  };

  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Bỏ comment dòng dưới khi có API
        // const response = await axiosClient.get('/api/users/profile');
        // const userData = response.data;
        // setUser(userData);

        // Dùng dữ liệu mẫu khi chưa có API
        setUser(defaultUser);
      } catch (err) {
        setError('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Xử lý cập nhật thông tin người dùng
  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    // Trong thực tế, đây là nơi xử lý đăng xuất
    // await axiosClient.post('/api/auth/logout');

    // Chuyển hướng về trang chủ
    navigate('/');
  };

  if (loading && !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error && !user) {
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
            <h2 className="text-xl font-bold mb-2">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-600 mb-4">@{user.username}</p>
          </div>

          {/* Menu sidebar */}
          <UserSidebar onLogout={handleLogout} />
        </div>

        {/* Nội dung chính */}
        <div className="lg:w-3/4">
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