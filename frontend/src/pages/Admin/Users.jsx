import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaEdit, FaTrash, FaLock, FaUnlock, FaSearch, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'user',
    gender: 'male',
    first_name: '',
    last_name: '',
    status: 'active'
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách người dùng
    // Hiện tại sử dụng dữ liệu mẫu
    const mockUsers = [
      { user_id: 1, username: 'admin', email: 'admin@example.com', phone: '0123456789', role: 'admin', gender: 'male', first_name: 'Admin', last_name: 'User', status: 'active', created_at: '2023-01-01' },
      { user_id: 2, username: 'creator1', email: 'creator1@example.com', phone: '0123456788', role: 'creator', gender: 'female', first_name: 'Creator', last_name: 'One', status: 'active', created_at: '2023-01-15' },
      { user_id: 3, username: 'user1', email: 'user1@example.com', phone: '0123456787', role: 'user', gender: 'male', first_name: 'User', last_name: 'One', status: 'active', created_at: '2023-02-01' },
      { user_id: 4, username: 'user2', email: 'user2@example.com', phone: '0123456786', role: 'user', gender: 'female', first_name: 'User', last_name: 'Two', status: 'banned', created_at: '2023-02-15' },
      { user_id: 5, username: 'creator2', email: 'creator2@example.com', phone: '0123456785', role: 'creator', gender: 'male', first_name: 'Creator', last_name: 'Two', status: 'active', created_at: '2023-03-01' },
    ];

    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleAddUser = () => {
    setCurrentUser(null);
    setFormData({
      username: '',
      email: '',
      phone: '',
      role: 'user',
      gender: 'male',
      first_name: '',
      last_name: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      gender: user.gender,
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status
    });
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      // Trong thực tế, sẽ gọi API để xóa người dùng
      setUsers(users.filter(user => user.user_id !== userId));
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    // Trong thực tế, sẽ gọi API để thay đổi trạng thái người dùng
    setUsers(users.map(user => {
      if (user.user_id === userId) {
        return { ...user, status: currentStatus === 'active' ? 'banned' : 'active' };
      }
      return user;
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser) {
      // Cập nhật người dùng hiện có
      setUsers(users.map(user => {
        if (user.user_id === currentUser.user_id) {
          return { ...user, ...formData };
        }
        return user;
      }));
    } else {
      // Thêm người dùng mới
      const newUser = {
        user_id: users.length + 1,
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }

    setShowModal(false);
  };

  const [expandedUser, setExpandedUser] = useState(null);

  const toggleExpand = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý người dùng</h1>
        <button
          onClick={handleAddUser}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy người dùng nào</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.user_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(user.user_id)}
                  >
                    <div className="flex-1 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{user.username}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'creator' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'admin' ? 'Quản trị viên' :
                             user.role === 'creator' ? 'Người sáng tạo' :
                             'Người dùng'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditUser(user);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(user.user_id, user.status);
                        }}
                        className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} p-1`}
                      >
                        {user.status === 'active' ? <FaLock /> : <FaUnlock />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.user_id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                      {expandedUser === user.user_id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {expandedUser === user.user_id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Thông tin cá nhân:</p>
                          <p className="text-gray-700">Họ tên: {user.first_name} {user.last_name}</p>
                          <p className="text-gray-700">Email: {user.email}</p>
                          <p className="text-gray-700">Số điện thoại: {user.phone}</p>
                          <p className="text-gray-700">Giới tính: {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Thông tin tài khoản:</p>
                          <p className="text-gray-700">ID: {user.user_id}</p>
                          <p className="text-gray-700">Ngày tạo: {user.created_at}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal thêm/sửa người dùng */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center" onClick={() => setShowModal(false)}>
            {/* Overlay sử dụng position thay vì z-index */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Sử dụng flex để căn giữa nội dung modal và position relative để hiển thị trên overlay */}
            <form onSubmit={handleSubmit} className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Vai trò</label>
                    <select
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="user">Người dùng</option>
                      <option value="creator">Người sáng tạo</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Tên</label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Họ</label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Giới tính</label>
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="active">Hoạt động</option>
                      <option value="banned">Bị khóa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-3"
                >
                  {currentUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-3"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;