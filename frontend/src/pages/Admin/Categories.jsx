import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    category_name: '',
    category_des: '',
    category_origin: '',
    category_type: 'traditional',
    status: 'draft'
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách danh mục
    // Hiện tại sử dụng dữ liệu mẫu
    const mockCategories = [
      { category_id: 1, category_name: 'Thư pháp truyền thống', category_des: 'Các phong cách thư pháp truyền thống Việt Nam', category_origin: 'Việt Nam', category_type: 'traditional', status: 'published' },
      { category_id: 2, category_name: 'Thư pháp hiện đại', category_des: 'Các phong cách thư pháp hiện đại', category_origin: 'Quốc tế', category_type: 'modern', status: 'published' },
      { category_id: 3, category_name: 'Thảo thư', category_des: 'Phong cách viết nhanh, tự do', category_origin: 'Trung Quốc', category_type: 'traditional', status: 'published' },
      { category_id: 4, category_name: 'Triện thư', category_des: 'Phong cách chữ khắc dấu cổ', category_origin: 'Trung Quốc', category_type: 'traditional', status: 'draft' },
      { category_id: 5, category_name: 'Lệ thư', category_des: 'Phong cách chữ hành chính', category_origin: 'Trung Quốc', category_type: 'traditional', status: 'published' },
    ];
    
    setCategories(mockCategories);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter(category => 
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.category_des.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.category_origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setFormData({
      category_name: '',
      category_des: '',
      category_origin: '',
      category_type: 'traditional',
      status: 'draft'
    });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setFormData({
      category_name: category.category_name,
      category_des: category.category_des,
      category_origin: category.category_origin,
      category_type: category.category_type,
      status: category.status
    });
    setShowModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      // Trong thực tế, sẽ gọi API để xóa danh mục
      setCategories(categories.filter(category => category.category_id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId, currentStatus) => {
    // Trong thực tế, sẽ gọi API để thay đổi trạng thái danh mục
    setCategories(categories.map(category => {
      if (category.category_id === categoryId) {
        const newStatus = currentStatus === 'published' ? 'draft' : 
                         currentStatus === 'draft' ? 'published' : 'archived';
        return { ...category, status: newStatus };
      }
      return category;
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentCategory) {
      // Cập nhật danh mục hiện có
      setCategories(categories.map(category => {
        if (category.category_id === currentCategory.category_id) {
          return { ...category, ...formData };
        }
        return category;
      }));
    } else {
      // Thêm danh mục mới
      const newCategory = {
        category_id: categories.length + 1,
        ...formData
      };
      setCategories([...categories, newCategory]);
    }
    
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      case 'archived':
        return 'Đã lưu trữ';
      default:
        return status;
    }
  };

  const getCategoryTypeText = (type) => {
    switch(type) {
      case 'traditional':
        return 'Truyền thống';
      case 'modern':
        return 'Hiện đại';
      case 'handwriting_design':
        return 'Thiết kế chữ viết tay';
      default:
        return type;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý danh mục thư pháp</h1>
        <button
          onClick={handleAddCategory}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm danh mục
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mô tả hoặc nguồn gốc"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nguồn gốc</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.category_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.category_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.category_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 truncate max-w-xs">{category.category_des}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.category_origin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getCategoryTypeText(category.category_type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(category.status)}`}>
                        {getStatusText(category.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(category.category_id, category.status)}
                          className={`${category.status === 'published' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                          title={category.status === 'published' ? 'Chuyển sang bản nháp' : 'Xuất bản'}
                        >
                          {category.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.category_id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal thêm/sửa danh mục */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ position: 'fixed' }}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" style={{ position: 'relative' }}>
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {currentCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Tên danh mục</label>
                      <input
                        type="text"
                        name="category_name"
                        id="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="category_des" className="block text-sm font-medium text-gray-700">Mô tả</label>
                      <textarea
                        name="category_des"
                        id="category_des"
                        rows="3"
                        value={formData.category_des}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="category_origin" className="block text-sm font-medium text-gray-700">Nguồn gốc</label>
                      <input
                        type="text"
                        name="category_origin"
                        id="category_origin"
                        value={formData.category_origin}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="category_type" className="block text-sm font-medium text-gray-700">Loại</label>
                      <select
                        name="category_type"
                        id="category_type"
                        value={formData.category_type}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="traditional">Truyền thống</option>
                        <option value="modern">Hiện đại</option>
                        <option value="handwriting_design">Thiết kế chữ viết tay</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                      <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="draft">Bản nháp</option>
                        <option value="published">Đã xuất bản</option>
                        <option value="archived">Đã lưu trữ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentCategory ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Categories;