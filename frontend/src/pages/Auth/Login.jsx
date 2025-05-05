import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform transition-all hover:shadow-xl duration-300">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Chào mừng trở lại!
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Tên đăng nhập */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên đăng nhập"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Lưu tài khoản / Quên mật khẩu */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Ghi nhớ</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-800 dark:hover:text-primary-400">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
          >
            Đăng nhập
          </button>
        </form>

        {/* Liên kết đăng ký */}
        <div className="mt-5 text-center text-sm text-gray-600 dark:text-gray-400">
          <span>Chưa có tài khoản? </span>
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-800 dark:hover:text-primary-400">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;