import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Component bảo vệ route, chỉ cho phép người dùng đã đăng nhập với quyền phù hợp truy cập
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Component con được bảo vệ
 * @param {string|string[]} props.requiredRole - Quyền yêu cầu để truy cập (mặc định là 'admin')
 * @param {string} props.redirectPath - Đường dẫn chuyển hướng khi không có quyền (mặc định là '/auth/login')
 */
const ProtectedRoute = ({
  children,
  requiredRole = 'admin',
  redirectPath = '/auth/login'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra thông tin người dùng từ localStorage
    const checkAuth = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);

        if (!userData) {
          setIsAuthenticated(false);
          return;
        }

        // Kiểm tra nếu requiredRole là mảng các vai trò
        if (Array.isArray(requiredRole)) {
          setIsAuthenticated(requiredRole.includes(userData.role));
        } else {
          // Kiểm tra nếu requiredRole là một chuỗi đơn
          setIsAuthenticated(userData.role === requiredRole);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra xác thực:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  // Hiển thị loading khi đang kiểm tra xác thực
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Chuyển hướng về trang đăng nhập nếu chưa xác thực
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Hiển thị component con nếu đã xác thực
  return children;
};

export default ProtectedRoute;