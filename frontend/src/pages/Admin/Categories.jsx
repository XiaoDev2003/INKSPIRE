import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from 'react-icons/fa';




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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories from /api/categories');
        const response = await axiosClient.get('/api/categories');
        console.log('Categories response:', response.data);
        const formattedCategories = response.data.map(category => ({
          category_id: category.category_id,
          category_name: category.category_name,
          category_des: category.category_des,
          category_origin: category.category_origin,
          category_type: category.category_type,
          status: category.status || 'draft'
        }));
        setCategories(formattedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err.response || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu danh mục.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.category_des && category.category_des.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (category.category_origin && category.category_origin.toLowerCase().includes(searchTerm.toLowerCase()))
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
    setError(null);
    setSuccess(null);
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
    setError(null);
    setSuccess(null);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        console.log('Deleting category with ID:', categoryId);
        const response = await axiosClient.delete('/api/categories', {
          data: { category_id: categoryId },
        });
        console.log('Delete response:', response.data);
        setCategories(categories.filter(category => category.category_id !== categoryId));
        setSuccess('Xóa danh mục thành công!');
      } catch (err) {
        console.error('Error deleting category:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa danh mục.');
      }
    }
  };

  const handleToggleStatus = async (categoryId, currentStatus) => {
    try {
      console.log('Toggling status for category ID:', categoryId, 'Current status:', currentStatus);
      const newStatus = currentStatus === 'published' ? 'draft' :
                       currentStatus === 'draft' ? 'published' : 'archived';
      const response = await axiosClient.put('/api/categories', {
        category_id: categoryId,
        category_name: categories.find(c => c.category_id === categoryId).category_name,
        category_des: categories.find(c => c.category_id === categoryId).category_des,
        category_origin: categories.find(c => c.category_id === categoryId).category_origin,
        category_type: categories.find(c => c.category_id === categoryId).category_type,
        status: newStatus
      });
      console.log('Status update response:', response.data);
      setCategories(categories.map(category => {
        if (category.category_id === categoryId) {
          return { ...category, status: newStatus };
        }
        return category;
      }));
      setSuccess('Cập nhật trạng thái thành công!');
    } catch (err) {
      console.error('Error updating status:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi cập nhật trạng thái.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        category_name: formData.category_name,
        category_des: formData.category_des,
        category_origin: formData.category_origin,
        category_type: formData.category_type,
        status: formData.status
      };
      console.log('Submitting category:', payload);

      if (currentCategory) {
        payload.category_id = currentCategory.category_id;
        const response = await axiosClient.put('/api/categories', payload);
        console.log('Update response:', response.data);
        setCategories(categories.map(category =>
          category.category_id === currentCategory.category_id ? { ...category, ...payload } : category
        ));
        setSuccess('Cập nhật danh mục thành công!');
      } else {
        const response = await axiosClient.post('/api/categories', payload);
        console.log('Create response:', response.data);
        const newCategory = {
          category_id: response.data.category_id || (categories.length + 1),
          ...payload
        };
        setCategories([...categories, newCategory]);
        setSuccess('Thêm danh mục thành công!');
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error submitting category:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi lưu danh mục.');
    }
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

  const toggleExpand = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-green-600">{success}</p>
        </div>
      )}

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
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy danh mục nào</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <div key={category.category_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(category.category_id)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{category.category_name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(category.status)}`}>
                          {getStatusText(category.status)}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {getCategoryTypeText(category.category_type)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(category);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(category.category_id, category.status);
                        }}
                        className={`${category.status === 'published' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'} p-1`}
                        title={category.status === 'published' ? 'Chuyển sang bản nháp' : 'Xuất bản'}
                      >
                        {category.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.category_id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                      {expandedCategory === category.category_id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {expandedCategory === category.category_id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col md:flex-row md:space-x-6">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500">ID:</p>
                            <p className="text-gray-700">{category.category_id || 'Không có'}</p>
                          </div>
                          <div className="flex-1 mt-2 md:mt-0">
                            <p className="text-sm font-medium text-gray-500">Mô tả:</p>
                            <p className="text-gray-700 whitespace-pre-line">{category.category_des || 'Không có'}</p>
                          </div>
                          <div className="flex-1 mt-2 md:mt-0">
                            <p className="text-sm font-medium text-gray-500">Nguồn gốc:</p>
                            <p className="text-gray-700">{category.category_origin || 'Không có'}</p>
                          </div>
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

      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <form onSubmit={handleSubmit} className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="category_type" className="block text-sm font-medium text-gray-700">Loại</label>
                    <select
                      name="category_type"
                      id="category_type"
                      value={formData.category_type}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="draft">Bản nháp</option>
                      <option value="published">Đã xuất bản</option>
                      <option value="archived">Đã lưu trữ</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ml-3"
                >
                  {currentCategory ? 'Cập nhật' : 'Thêm mới'}
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

export default Categories;