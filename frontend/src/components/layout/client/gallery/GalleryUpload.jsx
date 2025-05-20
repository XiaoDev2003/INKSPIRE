// src/components/layout/client/gallery/GalleryUpload.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import axiosClient from '../../../../api/axiosClient';

const GalleryUpload = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    artist: '',
    technique: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const fileInputRef = useRef(null);

  // Fetch danh mục khi modal mở
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await axiosClient.get('/api/categories');
          const categoriesData = Array.isArray(response.data) ? response.data : [];
          const publishedCategories = categoriesData.filter(
            (category) => category && category.status === 'published'
          );
          setCategories(publishedCategories);
        } catch (err) {
          console.error('Lỗi khi lấy danh mục:', err);
          setError('Không thể tải danh mục. Vui lòng thử lại sau.');
        }
      };
      fetchCategories();
      
      // Reset form khi mở modal
      resetForm();
    }
  }, [isOpen]);
  
  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      category: '',
      artist: '',
      technique: ''
    });
    setImagePreview(null);
    setFile(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Xử lý khi người dùng thay đổi input
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Xử lý khi người dùng chọn file
  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Kiểm tra kích thước file (10MB = 10 * 1024 * 1024 bytes)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 10MB.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      
      // Kiểm tra loại file
      const fileType = selectedFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png|gif)$/)) {
        setError('Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF).');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
    }
  }, []);

  // Xử lý khi người dùng submit form
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Vui lòng chọn một hình ảnh để tải lên.');
      return;
    }
    
    if (!formData.title || !formData.category || !formData.artist) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Tạo FormData để gửi file và thông tin
      const uploadData = new FormData();
      uploadData.append('image', file);
      uploadData.append('image_title', formData.title);
      uploadData.append('image_description', formData.description);
      uploadData.append('category_id', formData.category);
      uploadData.append('artist_name', formData.artist);
      uploadData.append('technique', formData.technique);
      
      // Gửi request đến API
      const response = await axiosClient.post('/api/gallery/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Tải lên thành công! Tác phẩm của bạn sẽ được hiển thị sau khi được phê duyệt.');
      
      // Reset form sau khi tải lên thành công
      resetForm();
      
      // Đóng modal sau 2 giây
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error('Lỗi khi tải lên:', err);
      setError(err.response?.data?.error || 'Đã có lỗi xảy ra khi tải lên. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [file, formData, onClose, resetForm]);

  // Ngăn sự kiện click từ việc lan truyền đến overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto m-4 shadow-2xl"
        onClick={handleContentClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Đóng góp tác phẩm</h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh tác phẩm</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imagePreview ? (
                    <div className="text-center">
                      <img src={imagePreview} alt="Preview" className="mx-auto h-64 object-contain mb-4" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Xóa ảnh
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                        >
                          <span>Tải lên một tệp</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            onChange={handleFileChange} 
                            accept="image/jpeg,image/png,image/gif" 
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">hoặc kéo và thả</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề tác phẩm</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">Tên nghệ sĩ</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="technique" className="block text-sm font-medium text-gray-700 mb-1">Kỹ thuật sử dụng</label>
                <input
                  type="text"
                  id="technique"
                  name="technique"
                  value={formData.technique}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả tác phẩm</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
                {success}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Đang tải...' : 'Đăng tải'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;