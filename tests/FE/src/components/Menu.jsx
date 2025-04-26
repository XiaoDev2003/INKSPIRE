// 📁 src/components/Menu.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/queries">FAQs</NavLink>
      <NavLink to="/feedback">Feedback</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/sitemap">SiteMap</NavLink>

      {/* Nếu chưa đăng nhập thì hiện Login/Register */}
      {!user && (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {/* Nếu đã đăng nhập thì hiện Logout và quyền */}
      {user && (
        <>
          {user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </>
      )}
    </nav>
  );
}