import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/ui';
import { Banner } from '../components/common/common';
import axiosClient from '../api/axiosClient';

const Category = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFont, setSelectedFont] = useState(null);
  const [categoryType, setCategoryType] = useState('all');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]); // Lưu tất cả ảnh từ gallery
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const commentsPerPage = 10;
  const location = useLocation();
  const { type, itemId } = useParams();
  const navigate = useNavigate();

  // State cho dữ liệu từ API
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Giả lập user_id (thay bằng logic xác thực thực tế)
  const currentUserId = 1; // TODO: Lấy từ context hoặc auth

  // Lấy danh sách ngôn ngữ từ items
  const languageMap = {
    Vietnamese: 'Tiếng Việt',
    Chinese: 'Tiếng Trung',
    Japanese: 'Tiếng Nhật',
    Korean: 'Tiếng Hàn',
    English: 'Tiếng Anh',
  };

  const languages = Object.entries(languageMap).map(([key, name], index) => ({
    id: index + 1,
    key,
    name,
  }));

  // Lấy dữ liệu từ API (items, categories và gallery)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsResponse, categoriesResponse, galleryResponse] = await Promise.all([
          axiosClient.get('/api/items'),
          axiosClient.get('/api/categories'),
          axiosClient.get('/api/gallery'),
        ]);

        console.log('Items:', itemsResponse.data);
        console.log('Categories:', categoriesResponse.data);
        console.log('Gallery:', galleryResponse.data);

        setItems(itemsResponse.data);
        setCategories(categoriesResponse.data);
        setGalleryImages(galleryResponse.data); // Lưu tất cả ảnh từ gallery
      } catch (err) {
        setError(err.response?.data?.error || 'Đã có lỗi khi lấy dữ liệu.');
        console.error('API Error:', err.response, err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lấy bình luận theo item_id khi modal mở
  useEffect(() => {
    if (showModal && selectedFont) {
      const fetchComments = async () => {
        try {
          const response = await axiosClient.get(`/api/comments?item_id=${selectedFont.item_id}`);
          const formattedComments = response.data.map(comment => ({
            id: comment.comment_id,
            name: comment.username || 'Ẩn danh',
            avatar: comment.username ? comment.username[0].toUpperCase() : 'A',
            color: ['amber', 'green', 'blue', 'purple', 'red'][Math.floor(Math.random() * 5)],
            date: new Date(comment.created_at).toLocaleDateString('vi-VN'),
            content: comment.comment_content,
          }));
          setComments(formattedComments);
        } catch (err) {
          setCommentError(err.response?.data?.error || 'Đã có lỗi khi lấy bình luận.');
        }
      };
      fetchComments();
    }
  }, [showModal, selectedFont]);

  // Xác định loại thư pháp từ URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/traditional')) {
      setCategoryType('traditional');
    } else if (path.includes('/modern')) {
      setCategoryType('modern');
    } else if (path.includes('/handwriting')) {
      setCategoryType('handwriting_design');
    } else {
      setCategoryType('all');
    }

    if (itemId) {
      const fontItem = items.find(item => item.item_id === parseInt(itemId));
      if (fontItem) {
        setSelectedFont(fontItem);
        setShowModal(true);
      }
    }
  }, [location, itemId, items]);

  // Lọc items dựa trên từ khóa tìm kiếm, ngôn ngữ và loại thư pháp
  const filteredFonts = items.filter(item => {
    const category = categories.find(cat => cat.category_id === item.category_id);
    const itemCategoryType = category ? category.category_type : null;

    const matchesSearchTerm = item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(item.lang_type);
    const matchesCategory = categoryType === 'all' || itemCategoryType === categoryType;

    return matchesSearchTerm && matchesLanguage && matchesCategory;
  });

  // Hàm lấy ảnh từ gallery dựa trên item_id
  const getGalleryImageForItem = (itemId) => {
    const imagesForItem = galleryImages.filter(image => image.item_id === itemId);
    return imagesForItem.length > 0 ? imagesForItem[0].image_url : '/images/placeholder.jpg';
  };

  const handleLanguageChange = (languageKey) => {
    setSelectedLanguages(prev =>
      prev.includes(languageKey)
        ? prev.filter(lang => lang !== languageKey)
        : [...prev, languageKey]
    );
  };

  const handleViewMore = (font) => {
    setSelectedFont(font);
    setShowModal(true);
    navigate(`/category/${categoryType}/${font.item_id}`, { replace: true });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCommentError(null);
    setCommentSuccess(null);
    navigate(`/category/${categoryType}`, { replace: true });
  };

  const handleCopyUrl = (url) => {
    console.log('Attempting to copy URL:', url);
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('URL copied successfully');
        setShowCopyNotification(true);
        setTimeout(() => {
          setShowCopyNotification(false);
          console.log('Notification hidden');
        }, 2000);
      })
      .catch(err => console.error('Không thể sao chép URL:', err));
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setCommentError('Nội dung bình luận không được để trống.');
      return;
    }

    try {
      const response = await axiosClient.post('/api/comments', {
        comment_content: newComment,
        user_id: currentUserId,
        item_id: selectedFont.item_id,
        category_id: selectedFont.category_id,
      });
      console.log('Comment response:', response.data);

      const newCommentData = {
        id: response.data.comment_id || Date.now(),
        name: 'Bạn',
        avatar: 'B',
        color: 'blue',
        date: new Date().toLocaleDateString('vi-VN'),
        content: newComment,
      };
      setComments([newCommentData, ...comments]);
      setNewComment('');
      setCommentSuccess('Gửi bình luận thành công!');
      setCommentError(null);
    } catch (err) {
      setCommentError(err.response?.data?.error || 'Đã có lỗi khi gửi bình luận.');
      console.error('Error posting comment:', err.response, err.message);
    }
  };

  const getCategoryInfo = () => {
    const category = categories.find(cat => cat.category_type === categoryType) || {};
    return {
      title: category.category_name || 'Thư viện font thư pháp',
      subtitle: category.category_des || 'Khám phá và tải xuống các font thư pháp đa dạng từ nhiều nền văn hóa khác nhau',
      imageSrc: category.image_url || './banner/home.png'
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner
        title={categoryInfo.title}
        subtitle={categoryInfo.subtitle}
        ctaText="Tìm hiểu thêm"
        ctaLink="/about"
        imageSrc={categoryInfo.imageSrc}
      />

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm font thư pháp..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`fas fa-filter mr-2 ${showFilters ? 'text-white' : ''}`}></i>
              {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Lọc theo ngôn ngữ:</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map(language => (
                  <button
                    key={language.id}
                    className={`px-3 py-1 rounded-full text-sm ${selectedLanguages.includes(language.key) ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => handleLanguageChange(language.key)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600">
            Hiển thị {filteredFonts.length} font thư pháp
            {selectedLanguages.length > 0 && ` cho ${selectedLanguages.map(lang => languageMap[lang]).join(', ')}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading ? (
            <div className="text-center py-4">Đang tải...</div>
          ) : filteredFonts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Không tìm thấy font chữ nào</div>
          ) : (
            filteredFonts.map(font => (
              <Card key={font.item_id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 p-0">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={font.image_url || getGalleryImageForItem(font.item_id)}
                    alt={font.item_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <button
                      onClick={() => handleViewMore(font)}
                      className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                    >
                      Xem thêm
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{font.item_name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="mr-1">Tác giả:</span>
                    <span className="font-medium">{font.author_name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="mr-1">Phân loại:</span>
                    <span className="font-medium">{font.category_name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="mr-1">Ngày đăng:</span>
                    <span className="font-medium">{new Date(font.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="mr-1">Lượt xem:</span>
                    <span className="font-medium">{font.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="mr-1">Xuất xứ:</span>
                    <span className="font-medium">{font.item_origin || 'Không xác định'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyUrl(font.item_url)}
                      className="flex-1 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors duration-300 flex items-center justify-center"
                    >
                      <i className="fas fa-copy mr-2"></i>
                      Lấy font
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {showCopyNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-[1000] animate-fade-in-out">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              Đã sao chép URL font vào clipboard!
            </div>
          </div>
        )}

        {showModal && selectedFont && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">{selectedFont.item_name}</h2>
                <div className="flex items-center">
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={selectedFont.image_url || getGalleryImageForItem(selectedFont.item_id)}
                      alt={selectedFont.item_name}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông tin chi tiết</h3>
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Tác giả:</span>
                          <span className="font-medium">{selectedFont.author_name}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Phân loại:</span>
                          <span className="font-medium">{selectedFont.category_name}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngày đăng:</span>
                          <span className="font-medium">{new Date(selectedFont.created_at).toLocaleDateString('vi-VN')}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Lượt xem:</span>
                          <span className="font-medium">{selectedFont.views.toLocaleString()}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Xuất xứ:</span>
                          <span className="font-medium">{selectedFont.item_origin || 'Không xác định'}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngôn ngữ:</span>
                          <span className="font-medium">{languageMap[selectedFont.lang_type] || selectedFont.lang_type}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h3>
                      <p className="text-gray-700">{selectedFont.item_des}</p>
                    </div>
                    <button
                      onClick={() => handleCopyUrl(selectedFont.item_url)}
                      className="w-full py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center"
                    >
                      <i className="fas fa-copy mr-2"></i>
                      Lấy font
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Bình luận</h3>

                  {commentError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-center">
                      <p className="text-red-600">{commentError}</p>
                    </div>
                  )}
                  {commentSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
                      <p className="text-green-600">{commentSuccess}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <form onSubmit={handleSubmitComment}>
                      <textarea
                        placeholder="Viết bình luận của bạn..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>
                      <div className="mt-2 flex justify-between">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                        >
                          Gửi bình luận
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto pr-2 mb-16">
                      <div className="space-y-4">
                        {comments.length === 0 ? (
                          <p className="text-gray-500 text-center">Chưa có bình luận nào.</p>
                        ) : (
                          comments
                            .slice((currentCommentPage - 1) * commentsPerPage, currentCommentPage * commentsPerPage)
                            .map(comment => (
                              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                  <div className={`w-10 h-10 bg-${comment.color}-500 rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                                    {comment.avatar}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{comment.name}</h4>
                                    <p className="text-sm text-gray-500">{comment.date}</p>
                                  </div>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                              </div>
                            ))
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-white pt-2 pb-1 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {Math.ceil(comments.length / commentsPerPage) > 1 &&
                          Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentCommentPage(i + 1)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${currentCommentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                              {i + 1}
                            </button>
                          ))}
                      </div>
                      <button
                        onClick={() => {
                          const itemUrl = `${window.location.origin}/category/${categoryType}/${selectedFont.item_id}`;
                          navigate('/feedback', { state: { referringUrl: itemUrl } });
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                      >
                        <i className="fas fa-reply mr-2"></i>
                        Gửi phản hồi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;