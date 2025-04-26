// 📁 src/pages/Register.jsx
import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng ký
      await axiosClient.post('/api/register', form);
      // Tự động đăng nhập sau khi đăng ký
      const res = await axiosClient.post('/api/login', {
        email: form.email,
        password: form.password
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <section className="auth-form">
      <h2>Đăng Ký</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Họ tên" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <button type="submit">Đăng ký</button>
      </form>
      <p className="mt-4">
        Bạn đã có tài khoản?{' '}
        <b onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
          Đăng nhập ngay
        </b>
      </p>
    </section>
  );
}
