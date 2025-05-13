import React, { useState } from 'react';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
import axiosClient from '../../api/axiosClient';

const RegisterModal = ({ isOpen, onClose, onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      // Gửi yêu cầu đăng ký
      await axiosClient.post('/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Tự động đăng nhập sau khi đăng ký
      const res = await axiosClient.post('/api/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('user', JSON.stringify(res.data));
      onRegister({
        username: formData.username,
        email: formData.email
      });
      onClose();
    } catch (err) {
      console.error('Lỗi đăng ký:', err);

      // Xử lý các loại lỗi khác nhau
      if (err.response) {
        // Lỗi từ server với response
        if (err.response.status === 409) {
          setError('Email hoặc tên đăng nhập đã tồn tại. Vui lòng sử dụng thông tin khác.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(`Đăng ký thất bại: ${err.response.status}. Vui lòng thử lại.`);
        }
      } else if (err.request) {
        // Lỗi không nhận được response từ server
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại sau.');
      } else {
        // Lỗi khác
        setError('Đăng ký thất bại. Vui lòng thử lại sau.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-900">Đăng ký tài khoản</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Tạo mật khẩu"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="rounded text-amber-600 focus:ring-amber-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Tôi đồng ý với{' '}
                <a href="/terms" className="text-amber-600 hover:text-amber-800 font-medium hover:underline">
                  Điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="/privacy" className="text-amber-600 hover:text-amber-800 font-medium hover:underline">
                  Chính sách bảo mật
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-amber-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
          >
            <FaUserPlus />
            <span>Đăng ký</span>
          </button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
          <p>
            Đã có tài khoản?{' '}
            <button
              onClick={onBackToLogin || onClose}
              className="font-medium text-amber-600 hover:text-amber-800 border-none bg-transparent cursor-pointer"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;