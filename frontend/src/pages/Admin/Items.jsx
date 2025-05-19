import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye, FaEyeSlash, FaDownload, FaChevronDown, FaChevronUp, FaCopy } from 'react-icons/fa';

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
    status: 'draft',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Lấy user_id từ AuthContext
  const { user } = useContext(AuthContext);

  const getCurrentUserId = () => {
    return user?.user_id || null; // Lấy user_id từ context
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          axiosClient.get('/api/items'),
          axiosClient.get('/api/categories'),
        ]);
        setItems(itemsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    (item.item_name && item.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.item_des && item.item_des.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.item_origin && item.item_origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.lang_type && item.lang_type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
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
      status: 'draft',
    });
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setFormData({
      item_name: item.item_name || '',
      category_id: item.category_id || '',
      item_des: item.item_des || '',
      item_origin: item.item_origin || '',
      lang_type: item.lang_type || '',
      item_url: item.item_url || '',
      status: item.status || 'draft',
    });
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa font chữ này?')) {
      try {
        await axiosClient.delete('/api/items', { data: { item_id: itemId } });
        setItems(items.filter((item) => item.item_id !== itemId));
        setSuccess('Xóa thành công!');
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa.');
      }
    }
  };

  const handleToggleStatus = (itemId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : currentStatus === 'draft' ? 'published' : 'archived';
    setItems(items.map((item) =>
      item.item_id === itemId ? { ...item, status: newStatus } : item
    ));
    axiosClient.put('/api/items', {
      item_id: itemId,
      status: newStatus,
    }).catch((err) => setError(err.response?.data?.error || 'Đã có lỗi khi cập nhật trạng thái.'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm tạo hoặc cập nhật hình ảnh trong Gallery khi thêm/sửa font chữ
  const createGalleryImage = async (fontData, itemId = null) => {
    if (!itemId) return; // Không thực hiện nếu không có item_id
    
    try {
      // Lấy tất cả hình ảnh từ Gallery để kiểm tra
      const galleryResponse = await axiosClient.get('/api/gallery');
      const existingImages = galleryResponse.data;
      
      // Tìm hình ảnh đã liên kết với item_id này
      const existingImage = existingImages.find(img => img.item_id === itemId);
      
      const galleryPayload = {
        image_title: fontData.item_name, // Tiêu đề = tên font chữ
        image_description: fontData.item_des, // Mô tả = Mô tả font chữ
        image_url: fontData.item_url, // Đường dẫn hình ảnh = đường dẫn font
        category_id: fontData.category_id, // Category = id danh mục tương ứng
        item_id: itemId, // Liên kết với font chữ
        status: 'archived', // Trạng thái mặc định là đã lưu trữ
        uploaded_by: getCurrentUserId(), // Lấy user_id hiện tại
      };

      if (existingImage) {
        // Nếu đã có hình ảnh, cập nhật thay vì tạo mới
        galleryPayload.image_id = existingImage.image_id;
        const response = await axiosClient.put('/api/gallery', galleryPayload);
        
        // Kiểm tra nếu có lỗi từ server
        if (response.data && response.data.status === 'error') {
          setError(response.data.error || 'Lỗi khi cập nhật hình ảnh trong Gallery');
          return false;
        }
        
        console.log('Đã cập nhật hình ảnh trong Gallery');
        return true;
      } else {
        // Nếu chưa có, tạo mới
        const response = await axiosClient.post('/api/gallery', galleryPayload);
        
        // Kiểm tra nếu có lỗi từ server
        if (response.data && response.data.status === 'error') {
          setError(response.data.error || 'Lỗi khi tạo hình ảnh mới trong Gallery');
          return false;
        }
        
        console.log('Đã tạo hình ảnh mới trong Gallery');
        return true;
      }
    } catch (error) {
      console.error('Lỗi khi xử lý hình ảnh trong Gallery:', error.response?.data || error.message);
      // Hiển thị lỗi cho người dùng
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Đã xảy ra lỗi khi xử lý hình ảnh. Mỗi font chữ chỉ được liên kết với một hình ảnh.');
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        item_name: formData.item_name,
        category_id: formData.category_id || null,
        item_des: formData.item_des,
        item_origin: formData.item_origin,
        lang_type: formData.lang_type,
        item_url: formData.item_url,
        status: formData.status,
        author_id: getCurrentUserId(), // Lấy user_id hiện tại
        views: 0,
      };
      if (currentItem) {
        payload.item_id = currentItem.item_id;
        const response = await axiosClient.put('/api/items', payload);
        setItems(items.map((item) =>
          item.item_id === currentItem.item_id ? response.data : item
        ));
        setSuccess('Cập nhật thành công!');

        // Khi cập nhật font chữ, chỉ cập nhật hình ảnh trong Gallery nếu đã tồn tại
        // Không tạo mới hình ảnh nếu chưa có
        const galleryResponse = await axiosClient.get('/api/gallery');
        const existingImage = galleryResponse.data.find(img => img.item_id === currentItem.item_id);
        
        if (existingImage) {
          // Chỉ cập nhật hình ảnh nếu đã tồn tại
          const galleryResult = await createGalleryImage(payload, currentItem.item_id);
          if (!galleryResult) {
            // Nếu có lỗi khi cập nhật hình ảnh, vẫn giữ modal mở để người dùng có thể sửa
            return;
          }
        }
      } else {
        const response = await axiosClient.post('/api/items', payload);
        setItems([...items, response.data]);
        setSuccess('Thêm thành công!');

        // Tạo hình ảnh tự động trong Gallery khi thêm font chữ mới
        const galleryResult = await createGalleryImage(payload, response.data.item_id);
        if (!galleryResult) {
          // Nếu có lỗi khi tạo hình ảnh, vẫn giữ modal mở để người dùng có thể sửa
          return;
        }
      }
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Đã có lỗi khi lưu.');
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setSuccess('Đã sao chép URL!');
      setTimeout(() => setSuccess(null), 2000);
    }).catch((err) => {
      setError('Không thể sao chép URL.');
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
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
    switch (status) {
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

  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (itemId) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
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
            placeholder="Tìm kiếm theo tên, mô tả, nguồn gốc hoặc ngôn ngữ"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy font chữ nào</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.item_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(item.item_id)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.item_name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {getCategoryName(item.category_id)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                        <span className="text-xs text-gray-500">{item.lang_type}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditItem(item);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(item.item_id, item.status);
                        }}
                        className={`${item.status === 'published' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'} p-1`}
                        title={item.status === 'published' ? 'Chuyển sang bản nháp' : 'Xuất bản'}
                      >
                        {item.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <a
                        href={item.item_url}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Tải xuống"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaDownload />
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(item.item_url);
                        }}
                        className="text-gray-600 hover:text-gray-900 p-1"
                        title="Sao chép URL"
                      >
                        <FaCopy />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.item_id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                      {expandedItem === item.item_id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {expandedItem === item.item_id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Thông tin font chữ:</p>
                          <p className="text-gray-700">ID: {item.item_id}</p>
                          <p className="text-gray-700">Nguồn gốc: {item.item_origin}</p>
                          <p className="text-gray-700">Lượt xem: {item.views.toLocaleString()}</p>
                          <p className="text-gray-700">Ngày tạo: {new Date(item.created_at).toLocaleDateString('vi-VN')}</p>
                          <p className="text-gray-700">Tác giả: {item.author_name || 'Không xác định'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Mô tả:</p>
                          <p className="text-gray-700 whitespace-pre-line">{item.item_des}</p>
                          <div className="mt-4 flex space-x-2">
                            <a
                              href={item.item_url}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaDownload className="mr-1" /> Tải xuống font chữ
                            </a>
                            <button
                              onClick={() => handleCopyUrl(item.item_url)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              <FaCopy className="mr-1" /> Sao chép URL
                            </button>
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

      {/* Modal thêm/sửa font chữ */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <form onSubmit={handleSubmit} className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                  {currentItem ? 'Cập nhật' : 'Thêm mới'}
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

export default Items;