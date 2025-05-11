import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye, FaEyeSlash, FaDownload } from 'react-icons/fa';

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    item_name: '',
    category_id: '',
    item_des: '',
    item_origin: '',
    lang_type: '',
    item_url: '',
    status: 'draft'
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách font chữ và danh mục
    // Hiện tại sử dụng dữ liệu mẫu
    const mockCategories = [
      { category_id: 1, category_name: 'Thư pháp truyền thống' },
      { category_id: 2, category_name: 'Thư pháp hiện đại' },
      { category_id: 3, category_name: 'Thảo thư' },
      { category_id: 4, category_name: 'Triện thư' },
      { category_id: 5, category_name: 'Lệ thư' },
    ];

    const mockItems = [
      { item_id: 1, item_name: 'Thư pháp Việt', category_id: 1, item_des: 'Font chữ thư pháp Việt Nam truyền thống', item_origin: 'Việt Nam', lang_type: 'Vietnamese', item_url: '/fonts/thu-phap-viet.ttf', author_id: 1, views: 1250, status: 'published', created_at: '2023-01-15' },
      { item_id: 2, item_name: 'Chữ Thảo', category_id: 3, item_des: 'Font chữ thảo thư cổ điển', item_origin: 'Trung Quốc', lang_type: 'Chinese', item_url: '/fonts/chu-thao.ttf', author_id: 2, views: 980, status: 'published', created_at: '2023-02-10' },
      { item_id: 3, item_name: 'Triện thư', category_id: 4, item_des: 'Font chữ triện cổ điển', item_origin: 'Trung Quốc', lang_type: 'Chinese', item_url: '/fonts/trien-thu.ttf', author_id: 2, views: 750, status: 'draft', created_at: '2023-03-05' },
      { item_id: 4, item_name: 'Thư pháp hiện đại', category_id: 2, item_des: 'Font chữ thư pháp phong cách hiện đại', item_origin: 'Quốc tế', lang_type: 'Latin', item_url: '/fonts/thu-phap-hien-dai.ttf', author_id: 3, views: 620, status: 'published', created_at: '2023-03-20' },
      { item_id: 5, item_name: 'Chữ Lệ', category_id: 5, item_des: 'Font chữ lệ thư cổ điển', item_origin: 'Trung Quốc', lang_type: 'Chinese', item_url: '/fonts/chu-le.ttf', author_id: 1, views: 540, status: 'published', created_at: '2023-04-10' },
    ];

    setCategories(mockCategories);
    setItems(mockItems);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item_des.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item_origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lang_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    return category ? category.category_name : 'Không xác định';
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setFormData({
      item_name: '',
      category_id: categories.length > 0 ? categories[0].category_id : '',
      item_des: '',
      item_origin: '',
      lang_type: '',
      item_url: '',
      status: 'draft'
    });
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setFormData({
      item_name: item.item_name,
      category_id: item.category_id,
      item_des: item.item_des,
      item_origin: item.item_origin,
      lang_type: item.lang_type,
      item_url: item.item_url,
      status: item.status
    });
    setShowModal(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa font chữ này?')) {
      // Trong thực tế, sẽ gọi API để xóa font chữ
      setItems(items.filter(item => item.item_id !== itemId));
    }
  };

  const handleToggleStatus = (itemId, currentStatus) => {
    // Trong thực tế, sẽ gọi API để thay đổi trạng thái font chữ
    setItems(items.map(item => {
      if (item.item_id === itemId) {
        const newStatus = currentStatus === 'published' ? 'draft' :
                         currentStatus === 'draft' ? 'published' : 'archived';
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentItem) {
      // Cập nhật font chữ hiện có
      setItems(items.map(item => {
        if (item.item_id === currentItem.item_id) {
          return { ...item, ...formData };
        }
        return item;
      }));
    } else {
      // Thêm font chữ mới
      const newItem = {
        item_id: items.length + 1,
        ...formData,
        author_id: 1, // Giả định người dùng hiện tại là admin với ID 1
        views: 0,
        created_at: new Date().toISOString().split('T')[0]
      };
      setItems([...items, newItem]);
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

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý font chữ thư pháp</h1>
        <button
          onClick={handleAddItem}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm font chữ
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mô tả, nguồn gốc hoặc ngôn ngữ"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên font chữ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngôn ngữ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.item_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.item_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.item_name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{item.item_des}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getCategoryName(item.category_id)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lang_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.created_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(item.item_id, item.status)}
                          className={`${item.status === 'published' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                          title={item.status === 'published' ? 'Chuyển sang bản nháp' : 'Xuất bản'}
                        >
                          {item.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <a
                          href={item.item_url}
                          className="text-blue-600 hover:text-blue-900"
                          title="Tải xuống"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaDownload />
                        </a>
                        <button
                          onClick={() => handleDeleteItem(item.item_id)}
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

      {/* Modal thêm/sửa font chữ */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowModal(false)}></div>

            <div className="relative bg-white rounded-md shadow-md w-full max-w-lg mx-auto z-50" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                <div className="bg-white p-5">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentItem ? 'Chỉnh sửa font chữ' : 'Thêm font chữ mới'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">Tên font chữ</label>
                      <input
                        type="text"
                        name="item_name"
                        id="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Danh mục</label>
                      <select
                        name="category_id"
                        id="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                          <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="item_des" className="block text-sm font-medium text-gray-700">Mô tả</label>
                      <textarea
                        name="item_des"
                        id="item_des"
                        rows="3"
                        value={formData.item_des}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="item_origin" className="block text-sm font-medium text-gray-700">Nguồn gốc</label>
                      <input
                        type="text"
                        name="item_origin"
                        id="item_origin"
                        value={formData.item_origin}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lang_type" className="block text-sm font-medium text-gray-700">Ngôn ngữ</label>
                      <input
                        type="text"
                        name="lang_type"
                        id="lang_type"
                        value={formData.lang_type}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="item_url" className="block text-sm font-medium text-gray-700">Đường dẫn font</label>
                      <input
                        type="text"
                        name="item_url"
                        id="item_url"
                        value={formData.item_url}
                        onChange={handleChange}
                        className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
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
                    {currentItem ? 'Cập nhật' : 'Thêm mới'}
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

export default Items;