/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaSignInAlt, FaTimes } from 'react-icons/fa';
import axiosClient from '../../../api/axiosClient';
import {RegisterModal} from '../common';
import useAuth from '../../../hooks/useAuth';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Xử lý đăng nhập qua API
    try {
      const res = await axiosClient.post('/api/login', {
        email: username, // Gửi username như email để khớp với backend
        password,
      });

      // Kiểm tra phản hồi từ server
      if (res.data && res.data.success) {
        login(res.data.user); // Sử dụng context để cập nhật trạng thái toàn cục
        onLogin(res.data.user.username || username);
        onClose();
      } else {
        // Nếu server trả về lỗi trong phản hồi
        setError(res.data?.error || 'Đăng nhập không thành công');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  if (!isOpen && !registerModalOpen) return null;

  // Hiển thị modal đăng nhập chỉ khi isOpen là true và registerModalOpen là false
  const showLoginForm = isOpen && !registerModalOpen;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {showLoginForm && (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-amber-900">Đăng nhập</h2>
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
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email hoặc Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Nhập email hoặc tên đăng nhập"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
              >
                <FaSignInAlt />
                <span>Đăng nhập</span>
              </button>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-800">
                Quên mật khẩu?
              </a>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
            <p>
              Chưa có tài khoản?{' '}
              <button
                onClick={() => {
                  setRegisterModalOpen(true);
                  setLoginVisible(false);
                }}
                className="font-medium text-amber-600 hover:text-amber-800 border-none bg-transparent cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Modal đăng ký */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => {
          setRegisterModalOpen(false);
          setLoginVisible(true);
        }}
        onRegister={(data) => {
          console.log('Đăng ký:', data);
          setRegisterModalOpen(false);
          login(data); // Sử dụng context để cập nhật trạng thái toàn cục
          onLogin(data.username);
          onClose();
        }}
        onBackToLogin={() => {
          setRegisterModalOpen(false);
          setLoginVisible(true);
        }}
      />
    </div>
  );
};

export default LoginModal;