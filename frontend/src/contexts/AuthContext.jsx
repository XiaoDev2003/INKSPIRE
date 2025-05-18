import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Thêm loading để tránh render sớm

  // Lấy user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setRole(parsedUser.role || null);
        setIsAdmin(parsedUser.is_admin || false);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Cập nhật thông tin người dùng từ server nếu cần
  useEffect(() => {
    if (!loading && user) {
      // Đảm bảo isAdmin được đặt đúng dựa trên role hoặc is_admin
      console.log('AuthContext - User:', user);

      // Đảm bảo isAdmin được đặt đúng dựa trên role hoặc is_admin
      const adminStatus = user.is_admin === true || user.role === 'admin';
      console.log('AuthContext - Kiểm tra quyền admin:', adminStatus);

      if (adminStatus !== isAdmin) {
        console.log('AuthContext - Cập nhật trạng thái admin:', adminStatus);
        setIsAdmin(adminStatus);
      }

      // Gọi API để cập nhật thông tin người dùng nếu cần
      if (user?.token && !user.role) {
        axiosClient.get('/api/user', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((res) => {
            if (res.data?.user) {
              const updatedUser = {
                ...user,
                role: res.data.user.role,
                is_admin: res.data.user.is_admin,
              };
              setUser(updatedUser);
              setRole(updatedUser.role);
              setIsAdmin(updatedUser.is_admin);
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
          })
          .catch((err) => {
            console.error('Failed to fetch current user:', err);
            // logout(); // Có thể tự động logout nếu token hết hạn
          });
      }
    }
  }, [loading, user, isAdmin]);

  const login = (userData) => {
    console.log('AuthContext - Login với dữ liệu:', userData);

    // Đảm bảo is_admin được đặt đúng
    const adminStatus = userData.is_admin === true || userData.role === 'admin';
    console.log('AuthContext - Trạng thái admin khi đăng nhập:', adminStatus);

    setUser(userData);
    setIsLoggedIn(true);
    setRole(userData.role);
    setIsAdmin(adminStatus);

    // Đảm bảo dữ liệu lưu vào localStorage có is_admin đúng
    const updatedUserData = {
      ...userData,
      is_admin: adminStatus
    };

    localStorage.setItem('user', JSON.stringify(updatedUserData));
    console.log('AuthContext - Đã lưu user vào localStorage với is_admin =', adminStatus);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setRole(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        role,
        isAdmin,
        loading,
        login,
        logout,
      }}
    >
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};