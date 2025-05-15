import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaTrash, FaSearch, FaPlus, FaEye, FaEdit, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'traditional',
    status: 'published',
    file: null,
  });

  useEffect(() => {
    // Dữ liệu mẫu thay vì gọi API
    const mockImages = [
      {
        image_id: 1,
        title: 'Thư pháp Việt Nam',
        description: 'Tác phẩm thư pháp truyền thống Việt Nam',
        category: 'traditional',
        url: '/images/gallery/traditional1.jpg',
        thumbnail: '/images/gallery/thumbnails/traditional1.jpg',
        status: 'published',
        created_at: '2023-05-15',
        user_id: 1,
        user_name: 'Admin',
      },
      {
        image_id: 2,
        title: 'Thư pháp hiện đại',
        description: 'Tác phẩm thư pháp phong cách hiện đại',
        category: 'modern',
        url: '/images/gallery/modern1.jpg',
        thumbnail: '/images/gallery/thumbnails/modern1.jpg',
        status: 'published',
        created_at: '2023-05-20',
        user_id: 2,
        user_name: 'Creator1',
      },
    ];
    setImages(mockImages);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddImage = () => {
    setCurrentImage(null);
    setFormData({
      title: '',
      description: '',
      category: 'traditional',
      status: 'published',
      file: null,
    });
    setShowModal(true);
  };

  const handleEditImage = (image) => {
    setCurrentImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      status: image.status,
      file: null,
    });
    setShowModal(true);
  };

  const toggleExpand = (imageId) => {
    if (expandedImage === imageId) {
      setExpandedImage(null);
    } else {
      setExpandedImage(imageId);
    }
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      setImages(images.filter((image) => image.image_id !== imageId));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentImage) {
      setImages(
        images.map((image) =>
          image.image_id === currentImage.image_id
            ? {
                ...image,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                status: formData.status,
              }
            : image
        )
      );
    } else {
      const newImage = {
        image_id: images.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        url: '/images/gallery/placeholder.jpg',
        thumbnail: '/images/gallery/thumbnails/placeholder.jpg',
        created_at: new Date().toISOString().split('T')[0],
        user_id: 1,
        user_name: 'Admin',
      };
      setImages([...images, newImage]);
    }
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
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
      default:
        return status;
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'traditional':
        return 'Truyền thống';
      case 'modern':
        return 'Hiện đại';
      case 'creative':
        return 'Sáng tạo';
      default:
        return category;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-amber-900">Quản lý thư viện hình ảnh</h1>
        <button
          onClick={handleAddImage}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Thêm hình ảnh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề, mô tả hoặc danh mục"
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
                      <h3 className="font-medium text-gray-900">{image.title}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(image.status)}`}>
                          {getStatusText(image.status)}
                        </span>
                        <span className="text-xs text-gray-500">{getCategoryText(image.category)}</span>
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
                            src={image.url}
                            alt={image.title}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-gray-700 whitespace-pre-line">{image.description}</p>
                          <div className="mt-4 text-sm text-gray-500">
                            <p>Ngày tạo: {image.created_at}</p>
                            <p>Người tạo: {image.user_name}</p>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <FaDownload className="mr-1" /> Tải xuống
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

      {/* Modal thêm/sửa hình ảnh */}
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
                {currentImage ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Danh mục</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="traditional">Truyền thống</option>
                    <option value="modern">Hiện đại</option>
                    <option value="creative">Sáng tạo</option>
                  </select>
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
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Bản nháp</option>
                  </select>
                </div>
                {!currentImage && (
                  <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Tệp hình ảnh</label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                      required={!currentImage}
                    />
                  </div>
                )}
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