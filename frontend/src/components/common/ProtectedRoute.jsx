import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

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
  redirectPath = '/'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const { user: authUser, isAdmin, role: userRole, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    // Sử dụng thông tin từ AuthContext thay vì gọi API riêng
    if (!authLoading) {
      console.log('ProtectedRoute - AuthLoading đã hoàn tất');

      if (!authUser) {
        console.log('ProtectedRoute - Không có user, chuyển hướng đến:', redirectPath);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      console.log('ProtectedRoute - User:', authUser);
      console.log('ProtectedRoute - Role:', userRole);
      console.log('ProtectedRoute - IsAdmin:', isAdmin);
      console.log('ProtectedRoute - RequiredRole:', requiredRole);

      let hasAccess = false;

      // Nếu requiredRole là 'admin' và user có isAdmin = true, cho phép truy cập
      if (requiredRole === 'admin' && isAdmin === true) {
        console.log('ProtectedRoute - User có quyền admin, cho phép truy cập');
        hasAccess = true;
      }
      // Kiểm tra role thông thường
      else if (Array.isArray(requiredRole)) {
        hasAccess = requiredRole.includes(userRole);
        console.log('ProtectedRoute - Kiểm tra mảng role:', hasAccess);
      } else {
        hasAccess = userRole === requiredRole;
        console.log('ProtectedRoute - Kiểm tra role đơn:', hasAccess);
      }

      setIsAuthenticated(hasAccess);
      setIsLoading(false);
    }
  }, [authUser, userRole, isAdmin, requiredRole, authLoading, redirectPath]);

  // Log trạng thái hiện tại để debug
  console.log('ProtectedRoute - Trạng thái hiện tại:', {
    isLoading,
    isAuthenticated,
    authUser,
    isAdmin,
    userRole,
    requiredRole
  });

  // Hiển thị loading khi đang kiểm tra xác thực
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Chuyển hướng về trang chủ nếu chưa xác thực
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Không có quyền truy cập, chuyển hướng đến:', redirectPath);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Hiển thị component con nếu đã xác thực
  console.log('ProtectedRoute - Đã xác thực, hiển thị component con');
  return children;
};

export default ProtectedRoute;