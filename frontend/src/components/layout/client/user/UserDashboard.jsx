import React from 'react';
import { FaFileAlt, FaComment, FaHeart, FaEye, FaCalendarAlt, FaUserTag } from 'react-icons/fa';

const UserDashboard = ({ user }) => {
  // Dữ liệu mẫu cho thống kê người dùng
  const userStats = {
    posts: 12,
    comments: 48,
    likes: 156,
    views: 2345,
    joinDate: '15/08/2023',
    role: 'Thành viên'
  };

  // Dữ liệu mẫu cho hoạt động gần đây
  const recentActivities = [
    { id: 1, type: 'comment', content: 'Bạn đã bình luận về bài viết "Nghệ thuật thư pháp hiện đại"', date: '2 giờ trước' },
    { id: 2, type: 'like', content: 'Bạn đã thích bài viết "Hướng dẫn cơ bản về bút lông"', date: '1 ngày trước' },
    { id: 3, type: 'post', content: 'Bạn đã đăng bài viết mới "Chia sẻ kinh nghiệm học thư pháp"', date: '3 ngày trước' },
    { id: 4, type: 'view', content: 'Bạn đã xem thư viện ảnh "Tác phẩm thư pháp 2023"', date: '1 tuần trước' },
  ];

  // Hàm lấy icon cho từng loại hoạt động
  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment': return <FaComment className="text-blue-500" />;
      case 'like': return <FaHeart className="text-red-500" />;
      case 'post': return <FaFileAlt className="text-green-500" />;
      case 'view': return <FaEye className="text-purple-500" />;
      default: return <FaCalendarAlt className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
      
      {/* Thống kê người dùng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bài viết</p>
              <p className="text-2xl font-bold text-gray-800">{userStats.posts}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaFileAlt className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bình luận</p>
              <p className="text-2xl font-bold text-gray-800">{userStats.comments}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaComment className="text-green-500 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lượt thích</p>
              <p className="text-2xl font-bold text-gray-800">{userStats.likes}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FaHeart className="text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin tài khoản</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <FaCalendarAlt className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày tham gia</p>
              <p className="font-medium">{userStats.joinDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <FaUserTag className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vai trò</p>
              <p className="font-medium">{userStats.role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <FaEye className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Lượt xem</p>
              <p className="font-medium">{userStats.views}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hoạt động gần đây */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Hoạt động gần đây</h3>
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="p-2 bg-gray-100 rounded-full mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm text-gray-800">{activity.content}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;