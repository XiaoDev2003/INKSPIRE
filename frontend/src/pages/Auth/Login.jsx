// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      {/* Form đăng nhập */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Inkspire Logo" className="h-16 w-auto" />
        </div>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-serif font-bold text-amber-900 text-center mb-6">
          Chào mừng trở lại!
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Tên đăng nhập */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên đăng nhập"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder:text-gray-500"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder:text-gray-500"
              required
            />
          </div>

          {/* Lưu tài khoản / Quên mật khẩu */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2">Ghi nhớ</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-amber-600 hover:text-amber-800 transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
          >
            Đăng nhập
          </button>
        </form>

        {/* Liên kết đăng ký */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Chưa có tài khoản? </span>
          <Link to="/auth/register" className="font-medium text-amber-600 hover:text-amber-800">
            Đăng ký ngay
          </Link>
        </div>
      </div>

      {/* Trang trí nền mờ nhẹ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-200/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-3/4 w-64 h-64 bg-pink-200/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Login;