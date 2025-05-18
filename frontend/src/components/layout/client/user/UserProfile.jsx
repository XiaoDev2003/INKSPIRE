import React, { useState, useEffect } from 'react';
import { FaEdit, FaCamera } from 'react-icons/fa';
import axiosClient from '../../../../api/axiosClient';

const UserProfile = ({ user, onUpdateProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Cập nhật formData khi user prop thay đổi
  useEffect(() => {
    setFormData(user);
  }, [user]);


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
      // Chuẩn bị dữ liệu để gửi lên server
      const updatedData = {
        ...formData,
        avatar_url: avatarPreview || user.avatar_url
      };

      // Gửi dữ liệu lên server
      const response = await axiosClient.post('/api/user/update-profile', updatedData);

      if (response.data.success) {
        // Cập nhật dữ liệu người dùng
        const updatedUser = response.data.user || updatedData;

        // Gọi hàm callback để cập nhật state ở component cha
        if (onUpdateProfile) {
          onUpdateProfile(updatedUser);
        }

        setUpdateSuccess(true);
        setEditMode(false);
        setAvatarPreview(null);
      } else {
        setError(response.data.error || 'Cập nhật thất bại. Vui lòng thử lại.');
      }
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin người dùng</h2>

      <div>
        {/* Form thông tin */}
        <div className="w-full">
          <div className="bg-white p-6 rounded-lg shadow-md">

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
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Họ</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Tên</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>


                <div>
                  <label className="block text-gray-700 font-medium mb-2">Giới tính</label>
                  <select
                    name="gender"
                    value={formData.gender || 'other'}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                {editMode ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition-colors shadow-md hover:shadow-lg justify-center"
                  >
                    <FaEdit /> Chỉnh sửa thông tin
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;