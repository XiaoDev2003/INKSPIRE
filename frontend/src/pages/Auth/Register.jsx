import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const Register = () => {
  const [form, setForm] = useState({ fullname: '', username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Kiểm tra mật khẩu khớp nhau
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }
    
    try {
      // Gửi yêu cầu đăng ký với fullname làm username, username làm email
      await axiosClient.post('/api/register', {
        username: form.fullname, 
        email: form.username,   
        password: form.password,
      });
      
      // Tự động đăng nhập sau khi đăng ký
      const res = await axiosClient.post('/api/login', {
        email: form.username,   // Sử dụng email để đăng nhập
        password: form.password,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      console.error('Lỗi đăng ký:', err);
      
      // Xử lý các loại lỗi khác nhau
      if (err.response) {
        // Lỗi từ server với response
        if (err.response.status === 409) {
          setError('Email hoặc tên đăng nhập đã tồn tại. Vui lòng sử dụng thông tin khác.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      {/* Form đăng ký */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Inkspire Logo" className="h-16 w-auto drop-shadow-md" />
        </div>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-serif font-bold text-amber-900 text-center mb-6">
          Tạo tài khoản mới
        </h2>

        {/* Thông báo lỗi */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Họ tên (username) */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên (Tên đăng nhập)
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Nhập họ và tên"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder:text-gray-500"
              required
              onChange={handleChange}
              value={form.fullname}
            />
          </div>

          {/* Tên đăng nhập (email) */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Email (Tên đăng nhập)
            </label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="Nhập email"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder:text-gray-500"
              required
              onChange={handleChange}
              value={form.username}
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
              placeholder="Tạo mật khẩu"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder:text-gray-500"
              required
              onChange={handleChange}
              value={form.password}
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder:text-gray-500"
              required
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>

          {/* Điều khoản */}
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="rounded bg-gray-200 text-amber-600 focus:ring-amber-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Tôi đồng ý với{' '}
                <Link to="/terms" className="text-amber-600 hover:text-amber-800 font-medium hover:underline">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link to="/privacy" className="text-amber-600 hover:text-amber-800 font-medium hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
          >
            Đăng ký
          </button>
        </form>

        {/* Liên kết đăng nhập */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Đã có tài khoản? </span>
          <Link to="/auth/login" className="font-medium text-amber-600 hover:text-amber-800">
            Đăng nhập
          </Link>
        </div>
      </div>

      {/* Trang trí nền nhẹ nhàng */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-3/4 w-64 h-64 bg-pink-200/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Register;