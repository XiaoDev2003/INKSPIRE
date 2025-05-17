import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import axiosClient from '../../api/axiosClient';
import { FaTrash, FaSearch, FaPlus, FaEye, FaEdit, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [formData, setFormData] = useState({
    image_title: '',
    image_url: '',
    category_id: '',
    item_id: '',
    status: 'published',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images from /api/gallery');
        const response = await axiosClient.get('/api/gallery');
        console.log('Images response:', response.data);
        setImages(response.data);
      } catch (err) {
        console.error('Error fetching images:', err.response || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu hình ảnh.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    (image.image_title && image.image_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (image.category_name && image.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (image.item_name && image.item_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddImage = () => {
    setCurrentImage(null);
    setFormData({
      image_title: '',
      image_url: '',
      category_id: '',
      item_id: '',
      status: 'published',
    });
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleEditImage = (image) => {
    setCurrentImage(image);
    setFormData({
      image_title: image.image_title || '',
      image_url: image.image_url || '',
      category_id: image.category_id || '',
      item_id: image.item_id || '',
      status: image.status || 'published',
    });
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const toggleExpand = (imageId) => {
    if (expandedImage === imageId) {
      setExpandedImage(null);
    } else {
      setExpandedImage(imageId);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        console.log('Deleting image with ID:', imageId);
        const response = await axiosClient.delete('/api/gallery', {
          data: { image_id: imageId },
        });
        console.log('Delete response:', response.data);
        setImages(images.filter((image) => image.image_id !== imageId));
        setSuccess('Xóa hình ảnh thành công!');
      } catch (err) {
        console.error('Error deleting image:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'Đã có lỗi khi xóa hình ảnh.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        image_title: formData.image_title,
        image_url: formData.image_url,
        category_id: formData.category_id || null,
        item_id: formData.item_id || null,
        status: formData.status,
        uploaded_by: 1, // Giả định user_id = 1, có thể thay bằng logic xác thực
      };
      console.log('Submitting image:', payload);

      if (currentImage) {
        payload.image_id = currentImage.image_id;
        const response = await axiosClient.put('/api/gallery', payload);
        console.log('Update response:', response.data);
        setImages(images.map((image) =>
          image.image_id === currentImage.image_id ? response.data : image
        ));
        setSuccess('Cập nhật hình ảnh thành công!');
      } else {
        const response = await axiosClient.post('/api/gallery', payload);
        console.log('Create response:', response.data);
        setImages([...images, response.data]);
        setSuccess('Thêm hình ảnh thành công!');
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error submitting image:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Đã có lỗi khi lưu hình ảnh.');
    }
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

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-amber-900">Quản lý thư viện hình ảnh</h1>
          <div className="h-1 w-32 bg-amber-500 mt-2"></div>
        </div>
        <button
          onClick={handleAddImage}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm hình ảnh
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
            placeholder="Tìm kiếm theo tiêu đề, danh mục hoặc tên item"
            className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Không tìm thấy hình ảnh nào</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <div key={image.image_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(image.image_id)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{image.image_title || 'Không có tiêu đề'}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(image.status)}`}>
                          {getStatusText(image.status)}
                        </span>
                        <span className="text-xs text-gray-500">{image.category_name || 'Không có danh mục'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditImage(image);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.image_id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <FaTrash />
                      </button>
                      {expandedImage === image.image_id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                  {expandedImage === image.image_id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={image.image_url}
                            alt={image.image_title || 'Hình ảnh'}
                            className="w-full h-auto object-cover"
                            onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                          />
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-gray-700">Danh mục: {image.category_name || 'Không có'}</p>
                          <p className="text-gray-700">Item: {image.item_name || 'Không có'}</p>
                          <div className="mt-4 text-sm text-gray-500">
                            <p>Ngày tải lên: {new Date(image.upload_date).toLocaleDateString('vi-VN')}</p>
                            <p>Người tải lên: {image.uploaded_by_name || 'Không xác định'}</p>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <a
                              href={image.image_url}
                              download
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FaDownload className="mr-1" /> Tải xuống
                            </a>
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

      {/* Modal thêm/sửa hình ảnh */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto" style={{ isolation: 'isolate' }}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center" onClick={() => setShowModal(false)}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <form onSubmit={handleSubmit} className="relative inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-auto my-8" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {currentImage ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="image_title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input
                      type="text"
                      id="image_title"
                      name="image_title"
                      value={formData.image_title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL hình ảnh</label>
                    <input
                      type="text"
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Danh mục (ID)</label>
                    <input
                      type="number"
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Nhập ID danh mục (tùy chọn)"
                    />
                  </div>
                  <div>
                    <label htmlFor="item_id" className="block text-sm font-medium text-gray-700">Item (ID)</label>
                    <input
                      type="number"
                      id="item_id"
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Nhập ID item (tùy chọn)"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                      id="status"
                      name="status"
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
                  {currentImage ? 'Cập nhật' : 'Thêm mới'}
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

export default Gallery;