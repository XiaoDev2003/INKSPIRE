import React, { useState, useEffect } from 'react';
import { FaEdit, FaCamera, FaUser, FaEnvelope, FaGlobe, FaFacebook, FaTwitter } from 'react-icons/fa';
import axiosClient from '../api/axiosClient';

const Profile = () => {
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
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultUser);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Bỏ comment dòng dưới khi có API
        // const response = await axiosClient.get('/api/users/profile');
        // const userData = response.data;
        // setUser(userData);
        // setFormData(userData);

        // Dùng dữ liệu mẫu khi chưa có API
        setUser(defaultUser);
        setFormData(defaultUser);
      } catch (err) {
        setError('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Xử lý khi click vào nút chỉnh sửa
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Xử lý khi thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý khi thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUpdateSuccess(false);

    try {
      // Trong thực tế, đây là nơi gửi dữ liệu lên server
      // await axiosClient.post('/api/users/update-profile', formData);

      // Cập nhật dữ liệu người dùng
      setUser({
        ...formData,
        avatar_url: avatarPreview || user.avatar_url
      });
      setUpdateSuccess(true);
      setEditMode(false);
      setAvatarPreview(null);
    } catch (err) {
      setError('Cập nhật thất bại. Vui lòng thử lại.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi hủy chỉnh sửa
  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      ...user
    });
    setAvatarPreview(null);
  };

  if (loading && !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Avatar và thông tin cơ bản */}
        <div className="md:w-1/3">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className={`relative rounded-full overflow-hidden w-40 h-40 mb-4 ${editMode ? 'cursor-pointer' : ''} border-4 border-gray-100 shadow-lg`}>
              {editMode ? (
                <label className="cursor-pointer w-full h-full block">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <img
                    src={avatarPreview || user.avatar_url || '/public/logo.png'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <FaCamera className="text-white text-3xl" />
                  </div>
                </label>
              ) : (
                <img
                  src={user.avatar_url || '/public/logo.png'}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-600 mb-4">@{user.username}</p>

            {!editMode && (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors shadow-md hover:shadow-lg w-full justify-center"
              >
                <FaEdit /> Chỉnh sửa thông tin
              </button>
            )}
          </div>
        </div>

        {/* Form thông tin */}
        <div className="md:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Account Settings</h3>

            {updateSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Cập nhật thành công!
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">First name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Facebook</label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;