import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/admin/AdminLayout';
import { FaTrash, FaSearch, FaPlus, FaEye, FaEdit, FaDownload } from 'react-icons/fa';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'traditional',
    status: 'published',
    file: null
  });

  useEffect(() => {
    // Trong thực tế, sẽ gọi API để lấy danh sách hình ảnh
    // Hiện tại sử dụng dữ liệu mẫu
    const mockImages = [
      { image_id: 1, title: 'Thư pháp Việt Nam', description: 'Tác phẩm thư pháp truyền thống Việt Nam', category: 'traditional', url: '/images/gallery/traditional1.jpg', thumbnail: '/images/gallery/thumbnails/traditional1.jpg', status: 'published', created_at: '2023-05-15', user_id: 1, user_name: 'Admin' },
      { image_id: 2, title: 'Thư pháp hiện đại', description: 'Tác phẩm thư pháp phong cách hiện đại', category: 'modern', url: '/images/gallery/modern1.jpg', thumbnail: '/images/gallery/thumbnails/modern1.jpg', status: 'published', created_at: '2023-05-20', user_id: 2, user_name: 'Creator1' },
      { image_id: 3, title: 'Thảo thư', description: 'Mẫu chữ thảo thư cổ điển', category: 'traditional', url: '/images/gallery/traditional2.jpg', thumbnail: '/images/gallery/thumbnails/traditional2.jpg', status: 'published', created_at: '2023-06-01', user_id: 5, user_name: 'Creator2' },
      { image_id: 4, title: 'Triện thư', description: 'Mẫu chữ triện thư đẹp', category: 'traditional', url: '/images/gallery/traditional3.jpg', thumbnail: '/images/gallery/thumbnails/traditional3.jpg', status: 'draft', created_at: '2023-06-10', user_id: 2, user_name: 'Creator1' },
      { image_id: 5, title: 'Thư pháp sáng tạo', description: 'Tác phẩm thư pháp kết hợp hội họa', category: 'creative', url: '/images/gallery/creative1.jpg', thumbnail: '/images/gallery/thumbnails/creative1.jpg', status: 'published', created_at: '2023-06-15', user_id: 5, user_name: 'Creator2' },
    ];
    
    setImages(mockImages);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter(image => 
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
      file: null
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
      file: null
    });
    setShowModal(true);
  };

  const handleViewImage = (image) => {
    setCurrentImage(image);
    setShowViewModal(true);
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      // Trong thực tế, sẽ gọi API để xóa hình ảnh
      setImages(images.filter(image => image.image_id !== imageId));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files.length > 0) {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentImage) {
      // Cập nhật hình ảnh hiện có
      setImages(images.map(image => {
        if (image.image_id === currentImage.image_id) {
          return { 
            ...image, 
            title: formData.title,
            description: formData.description,
            category: formData.category,
            status: formData.status
          };
        }
        return image;
      }));
    } else {
      // Thêm hình ảnh mới (trong thực tế sẽ upload file và nhận URL từ server)
      const newImage = {
        image_id: images.length + 1,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        url: '/images/gallery/placeholder.jpg', // Placeholder URL
        thumbnail: '/images/gallery/thumbnails/placeholder.jpg', // Placeholder thumbnail
        created_at: new Date().toISOString().split('T')[0],
        user_id: 1,
        user_name: 'Admin'
      };
      setImages([...images, newImage]);
    }
    
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
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
      default:
        return status;
    }
  };

  const getCategoryText = (category) => {
    switch(category) {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.image_id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative pb-[75%] overflow-hidden bg-gray-100">
                  <img 
                    src={image.thumbnail} 
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    onClick={() => handleViewImage(image)}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{image.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{image.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(image.status)}`}>
                        {getStatusText(image.status)}
                      </span>
                      <span className="text-xs text-gray-500">{getCategoryText(image.category)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewImage(image)}
                        className="text-amber-600 hover:text-amber-800 p-1"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEditImage(image)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.image_id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm/sửa hình ảnh */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentImage ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Danh mục
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="traditional">Truyền thống</option>
                        <option value="modern">Hiện đại</option>
                        <option value="creative">Sáng tạo</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="published">Đã xuất bản</option>
                        <option value="draft">Bản nháp</option>
                      </select>
                    </div>
                    {!currentImage && (
                      <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                          Tệp hình ảnh
                        </label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-white file:text-sm file:font-semibold hover:file:bg-amber-700 focus-within:ring-2 ring-amber-500 rounded-lg"
                          required={!currentImage}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentImage ? 'Cập nhật' : 'Thêm mới'}
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

      {/* Modal xem chi tiết hình ảnh */}
      {showViewModal && currentImage && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{currentImage.title}</h3>
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={currentImage.url} 
                        alt={currentImage.title}
                        className="w-full h-auto max-h-96 object-contain"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700">{currentImage.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(currentImage.status)}`}>
                          {getStatusText(currentImage.status)}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {getCategoryText(currentImage.category)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Ngày tạo: {currentImage.created_at}</p>
                        <p>Người tạo: {currentImage.user_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleEditImage(currentImage)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <FaEdit className="mr-2" /> Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <FaDownload className="mr-2" /> Tải xuống
                </button>
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Gallery;