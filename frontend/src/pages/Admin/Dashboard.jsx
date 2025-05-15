import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaUsers, FaList, FaFont, FaImages, FaComments, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    items: 0,
    gallery: 0,
    comments: 0,
    feedback: 0,
    faq: 0,
    views: 0
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy thống kê
    // Hiện tại sử dụng dữ liệu mẫu
    setStats({
      users: 120,
      categories: 15,
      items: 78,
      gallery: 45,
      comments: 230,
      feedback: 28,
      faq: 12,
      views: 5420
    });
  }, []);

  const statCards = [
    { title: 'Người dùng', count: stats.users, icon: <FaUsers className="text-blue-500" />, link: '/admin/users' },
    { title: 'Danh mục', count: stats.categories, icon: <FaList className="text-green-500" />, link: '/admin/categories' },
    { title: 'Font chữ', count: stats.items, icon: <FaFont className="text-purple-500" />, link: '/admin/items' },
    { title: 'Thư viện ảnh', count: stats.gallery, icon: <FaImages className="text-amber-500" />, link: '/admin/gallery' },
    { title: 'Bình luận', count: stats.comments, icon: <FaComments className="text-red-500" />, link: '/admin/comments' },
    { title: 'Phản hồi', count: stats.feedback, icon: <FaComments className="text-indigo-500" />, link: '/admin/feedback' },
    { title: 'FAQ', count: stats.faq, icon: <FaQuestionCircle className="text-teal-500" />, link: '/admin/faq' },
    { title: 'Lượt xem', count: stats.views, icon: <FaUsers className="text-gray-500" />, link: '/admin/statistics' },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Bảng điều khiển</h1>
        <p className="text-gray-600">Chào mừng đến với trang quản trị Inkspire</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link 
            to={card.link} 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.count.toLocaleString()}</p>
              </div>
              <div className="text-3xl">{card.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {/* Danh sách hoạt động mẫu */}
            {[
              { user: 'Nguyễn Văn A', action: 'đã đăng ký tài khoản mới', time: '5 phút trước' },
              { user: 'Trần Thị B', action: 'đã thêm bình luận mới', time: '15 phút trước' },
              { user: 'Lê Văn C', action: 'đã tải xuống font chữ Thư pháp Việt', time: '30 phút trước' },
              { user: 'Admin', action: 'đã thêm danh mục mới', time: '1 giờ trước' },
              { user: 'Phạm Thị D', action: 'đã gửi phản hồi', time: '2 giờ trước' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <span className="font-medium text-amber-800">{activity.user}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4">Font chữ phổ biến</h2>
          <div className="space-y-4">
            {/* Danh sách font chữ phổ biến mẫu */}
            {[
              { name: 'Thư pháp Việt', downloads: 1250, category: 'Truyền thống' },
              { name: 'Chữ Thảo', downloads: 980, category: 'Thảo thư' },
              { name: 'Triện thư', downloads: 750, category: 'Cổ điển' },
              { name: 'Thư pháp hiện đại', downloads: 620, category: 'Hiện đại' },
              { name: 'Chữ Lệ', downloads: 540, category: 'Truyền thống' },
            ].map((font, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <span className="font-medium text-amber-800">{font.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({font.category})</span>
                </div>
                <span className="text-sm text-gray-600">{font.downloads} lượt tải</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;