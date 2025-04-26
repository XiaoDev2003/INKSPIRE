// 📁 src/pages/Login.jsx
import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/api/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError('Sai email hoặc mật khẩu');
    }
  };

  return (
    <section className="auth-form">
      <h2>Đăng Nhập</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <button type="submit" className="mt-3">Đăng nhập</button>
      </form>
      <p className="mt-4">
        Bạn chưa có tài khoản?{' '}
        <b onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
          Đăng ký ngay
        </b>
      </p>
    </section>
  );
}
