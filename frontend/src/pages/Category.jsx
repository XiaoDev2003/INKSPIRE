// src/pages/Category.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/ui';
import { Banner } from '../components/common/common';


const Category = () => {
  // State cho việc hiển thị/ẩn bộ lọc
  const [showFilters, setShowFilters] = useState(false);
  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // State cho ngôn ngữ được chọn
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  // State cho modal popup
  const [showModal, setShowModal] = useState(false);
  // State cho font được chọn để xem chi tiết
  const [selectedFont, setSelectedFont] = useState(null);
  // State cho loại thư pháp hiện tại
  const [categoryType, setCategoryType] = useState('all');
  // State cho thông báo sao chép URL
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  // State cho trang bình luận hiện tại
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  // Số lượng bình luận tối đa trên một trang
  const commentsPerPage = 10;
  // Lấy thông tin đường dẫn hiện tại
  const location = useLocation();
  // Lấy tham số từ URL
  const { type, itemId } = useParams();
  // Sử dụng navigate để điều hướng
  const navigate = useNavigate();

  // Danh sách các ngôn ngữ có thể lọc
  const languages = [
    { id: 1, name: 'Tiếng Việt' },
    { id: 2, name: 'Tiếng Trung' },
    { id: 3, name: 'Tiếng Nhật' },
    { id: 4, name: 'Tiếng Hàn' },
    { id: 5, name: 'Tiếng Anh' },
  ];

  // Dữ liệu mẫu cho các font thư pháp
  const fonts = [
    {
      id: 1,
      name: 'Thư pháp Việt cổ',
      author: 'Nguyễn Văn A',
      uploader: 'Admin',
      uploadDate: '15/05/2023',
      downloads: 1250,
      rating: 4.5,
      image: '/images/font-1.jpg',
      description: 'Font thư pháp Việt cổ với nét bút mềm mại, phù hợp cho các tác phẩm nghệ thuật truyền thống.',
      language: 'Tiếng Việt',
      category: 'traditional',
    },
    {
      id: 2,
      name: 'Thư pháp Hán Nôm',
      author: 'Trần Văn B',
      uploader: 'Moderator',
      uploadDate: '20/06/2023',
      downloads: 980,
      rating: 4.2,
      image: '/images/font-2.jpg',
      description: 'Font thư pháp Hán Nôm với nét bút mạnh mẽ, thích hợp cho việc viết các câu đối, câu chữ cổ điển.',
      language: 'Tiếng Trung',
      category: 'traditional',
    },
    {
      id: 3,
      name: 'Thư pháp Hiện đại',
      author: 'Lê Văn C',
      uploader: 'Creator',
      uploadDate: '10/07/2023',
      downloads: 1500,
      rating: 4.8,
      image: '/images/font-3.jpg',
      description: 'Font thư pháp hiện đại kết hợp giữa nét truyền thống và phong cách đương đại.',
      language: 'Tiếng Việt',
      category: 'modern',
    },
    {
      id: 4,
      name: 'Thư pháp Nhật Bản',
      author: 'Tanaka Yuki',
      uploader: 'JapanArt',
      uploadDate: '05/04/2023',
      downloads: 850,
      rating: 4.3,
      image: '/images/font-4.jpg',
      description: 'Font thư pháp Nhật Bản với phong cách Shodo truyền thống.',
      language: 'Tiếng Nhật',
      category: 'traditional',
    },
    {
      id: 5,
      name: 'Thư pháp Hàn Quốc',
      author: 'Kim Min-ji',
      uploader: 'KoreanArt',
      uploadDate: '12/03/2023',
      downloads: 720,
      rating: 4.1,
      image: '/images/font-5.jpg',
      description: 'Font thư pháp Hàn Quốc với phong cách Seoye truyền thống.',
      language: 'Tiếng Hàn',
      category: 'traditional',
    },
    {
      id: 6,
      name: 'Thư pháp Latinh',
      author: 'John Smith',
      uploader: 'LatinArt',
      uploadDate: '25/02/2023',
      downloads: 950,
      rating: 4.4,
      image: '/images/font-6.jpg',
      description: 'Font thư pháp Latinh với phong cách cổ điển, phù hợp cho các văn bản trang trọng.',
      language: 'Tiếng Anh',
      category: 'modern',
    },
    {
      id: 7,
      name: 'Thư pháp Đông Nam Á',
      author: 'Phạm Văn D',
      uploader: 'SEAArt',
      uploadDate: '18/01/2023',
      downloads: 680,
      rating: 4.0,
      image: '/images/font-7.jpg',
      description: 'Font thư pháp Đông Nam Á với nét đặc trưng của văn hóa khu vực.',
      language: 'Tiếng Việt',
      category: 'handwriting',
    },
    {
      id: 8,
      name: 'Thư pháp Trung Hoa',
      author: 'Wang Li',
      uploader: 'ChineseArt',
      uploadDate: '30/12/2022',
      downloads: 1100,
      rating: 4.6,
      image: '/images/font-8.jpg',
      description: 'Font thư pháp Trung Hoa với phong cách cổ điển, thích hợp cho các tác phẩm nghệ thuật truyền thống.',
      language: 'Tiếng Trung',
      category: 'traditional',
    },
    {
      id: 9,
      name: 'Thư pháp Tây Tạng',
      author: 'Tenzin Gyatso',
      uploader: 'TibetArt',
      uploadDate: '15/11/2022',
      downloads: 520,
      rating: 3.9,
      image: '/images/font-9.jpg',
      description: 'Font thư pháp Tây Tạng với nét bút đặc trưng của văn hóa Phật giáo Tây Tạng.',
      language: 'Tiếng Trung',
      category: 'traditional',
    },
    {
      id: 10,
      name: 'Thư pháp Ả Rập',
      author: 'Mohammed Al-Farsi',
      uploader: 'ArabicArt',
      uploadDate: '20/10/2022',
      downloads: 780,
      rating: 4.2,
      image: '/images/font-10.jpg',
      description: 'Font thư pháp Ả Rập với nét bút uốn lượn đặc trưng của văn hóa Hồi giáo.',
      language: 'Tiếng Anh',
      category: 'handwriting',
    },
  ];

  // Xác định loại thư pháp từ URL và kiểm tra itemId
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/traditional')) {
      setCategoryType('traditional');
    } else if (path.includes('/modern')) {
      setCategoryType('modern');
    } else if (path.includes('/handwriting')) {
      setCategoryType('handwriting');
    } else {
      setCategoryType('all');
    }

    // Kiểm tra nếu có itemId trong URL thì mở modal tương ứng
    if (itemId) {
      const fontItem = fonts.find(font => font.id === parseInt(itemId));
      if (fontItem) {
        setSelectedFont(fontItem);
        setShowModal(true);
      }
    }
  }, [location, itemId]);

  // Lọc fonts dựa trên từ khóa tìm kiếm, ngôn ngữ đã chọn và loại thư pháp
  const filteredFonts = fonts.filter(font => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearchTerm = font.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      font.author.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo ngôn ngữ đã chọn
    const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(font.language);

    // Lọc theo loại thư pháp
    const matchesCategory = categoryType === 'all' ||
      (categoryType === 'traditional' && font.category === 'traditional') ||
      (categoryType === 'modern' && font.category === 'modern') ||
      (categoryType === 'handwriting' && font.category === 'handwriting');

    return matchesSearchTerm && matchesLanguage && matchesCategory;
  });

  // Xử lý khi chọn/bỏ chọn ngôn ngữ
  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  // Xử lý khi click vào nút xem thêm
  const handleViewMore = (font) => {
    setSelectedFont(font);
    setShowModal(true);
    // Cập nhật URL với ID của font
    navigate(`/category/${categoryType}/${font.id}`, { replace: true });
  };

  // Xử lý khi đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    // Xóa tham số itemId khỏi URL
    navigate(`/category/${categoryType}`, { replace: true });
  };

  // Xử lý sao chép URL
  const handleCopyLink = () => {
    if (selectedFont) {
      const url = `${window.location.origin}/category/${categoryType}/${selectedFont.id}`;
      navigator.clipboard.writeText(url)
        .then(() => {
          setShowCopyNotification(true);
          setTimeout(() => setShowCopyNotification(false), 2000);
        })
        .catch(err => console.error('Không thể sao chép URL: ', err));
    }
  };

  // Hiển thị số sao đánh giá
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Thêm sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-500"></i>);
    }

    // Thêm nửa sao nếu có
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-500"></i>);
    }

    // Thêm sao trống cho đủ 5 sao
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-500"></i>);
    }

    return stars;
  };

  // Xác định tiêu đề, mô tả và hình ảnh banner dựa trên loại thư pháp
  const getCategoryInfo = () => {
    switch(categoryType) {
      case 'traditional':
        return {
          title: "Thư pháp truyền thống",
          subtitle: "Nghệ thuật viết chữ truyền thống với bút lông và mực Tàu, thể hiện vẻ đẹp của văn hóa Á Đông",
          imageSrc: "./banner/traditional.png"
        };
      case 'modern':
        return {
          title: "Thư pháp hiện đại",
          subtitle: "Kết hợp giữa kỹ thuật truyền thống và phong cách đương đại, tạo nên những tác phẩm độc đáo và sáng tạo",
          imageSrc: "./banner/modern.png"
        };
      case 'handwriting':
        return {
          title: "Viết tay thiết kế",
          subtitle: "Nghệ thuật viết tay kết hợp với thiết kế hiện đại, tạo nên những tác phẩm độc đáo và cá nhân hóa",
          imageSrc: "./banner/writing.png"
        };
      default:
        return {
          title: "Thư viện font thư pháp",
          subtitle: "Khám phá và tải xuống các font thư pháp đa dạng từ nhiều nền văn hóa khác nhau",
          imageSrc: "./banner/home.png"
        };
    }
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <Banner
        title={categoryInfo.title}
        subtitle={categoryInfo.subtitle}
        ctaText="Tìm hiểu thêm"
        ctaLink="/about"
        imageSrc={categoryInfo.imageSrc}
      />

      {/* Container chính */}
      <div className="container mx-auto px-4 py-8">
        {/* Phần tìm kiếm và bộ lọc */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            {/* Thanh tìm kiếm */}
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

            {/* Nút hiển thị/ẩn bộ lọc */}
            <button
              className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`fas fa-filter mr-2 ${showFilters ? 'text-white' : ''}`}></i>
              {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>
          </div>

          {/* Bộ lọc ngôn ngữ */}
          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Lọc theo ngôn ngữ:</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map(language => (
                  <button
                    key={language.id}
                    className={`px-3 py-1 rounded-full text-sm ${selectedLanguages.includes(language.name) ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => handleLanguageChange(language.name)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Hiển thị số lượng kết quả */}
        <div className="mb-4">
          <p className="text-gray-600">
            Hiển thị {filteredFonts.length} font thư pháp
            {selectedLanguages.length > 0 && ` cho ${selectedLanguages.join(', ')}`}
          </p>
        </div>

        {/* Danh sách các font thư pháp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredFonts.map(font => (
            <Card key={font.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 p-0">
              {/* Phần hình ảnh với hiệu ứng hover */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={font.image}
                  alt={font.name}
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

              {/* Phần thông tin */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{font.name}</h3>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="mr-1">Tác giả:</span>
                  <span className="font-medium">{font.author}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="mr-1">Người đăng:</span>
                  <span className="font-medium">{font.uploader}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="mr-1">Ngày đăng:</span>
                  <span className="font-medium">{font.uploadDate}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="mr-1">Lượt tải:</span>
                  <span className="font-medium">{font.downloads.toLocaleString()}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span className="mr-1">Đánh giá:</span>
                  <div className="flex">{renderStars(font.rating)}</div>
                  <span className="ml-1">({font.rating})</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors duration-300 flex items-center justify-center">
                    <i className="fas fa-download mr-2"></i>
                    Tải xuống
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `${window.location.origin}/category/${categoryType}/${font.id}`;
                      navigator.clipboard.writeText(url)
                        .then(() => {
                          setShowCopyNotification(true);
                          setTimeout(() => setShowCopyNotification(false), 2000);
                        })
                        .catch(err => console.error('Không thể sao chép URL: ', err));
                    }}
                    className="px-2 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                    title="Sao chép liên kết"
                  >
                    <i className="fas fa-link"></i>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Thông báo sao chép URL */}
        {showCopyNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              Đã sao chép URL vào clipboard!
            </div>
          </div>
        )}

        {/* Modal popup */}
        {showModal && selectedFont && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">{selectedFont.name}</h2>
                <div className="flex items-center">
                  <button
                    onClick={handleCopyLink}
                    className="mr-4 text-amber-500 hover:text-amber-700 focus:outline-none flex items-center"
                    title="Sao chép liên kết"
                  >
                    <i className="fas fa-link text-xl"></i>
                  </button>
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
                  {/* Hình ảnh font */}
                  <div className="md:w-1/2">
                    <img
                      src={selectedFont.image}
                      alt={selectedFont.name}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông tin chi tiết</h3>
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Tác giả:</span>
                          <span className="font-medium">{selectedFont.author}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Người đăng:</span>
                          <span className="font-medium">{selectedFont.uploader}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngày đăng:</span>
                          <span className="font-medium">{selectedFont.uploadDate}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Lượt tải:</span>
                          <span className="font-medium">{selectedFont.downloads.toLocaleString()}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Đánh giá:</span>
                          <div className="flex">{renderStars(selectedFont.rating)}</div>
                          <span className="ml-1">({selectedFont.rating})</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngôn ngữ:</span>
                          <span className="font-medium">{selectedFont.language}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h3>
                      <p className="text-gray-700">{selectedFont.description}</p>
                    </div>

                    <button className="w-full py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center">
                      <i className="fas fa-download mr-2"></i>
                      Tải xuống font
                    </button>
                  </div>
                </div>

                {/* Phần bình luận */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Bình luận</h3>

                  {/* Form bình luận */}
                  <div className="mb-6">
                    <textarea
                      placeholder="Viết bình luận của bạn..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-24"
                    ></textarea>
                    <div className="mt-2 flex justify-between">
                      <button className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300">
                        Gửi bình luận
                      </button>
                    </div>
                  </div>

                  {/* Dữ liệu mẫu cho bình luận */}
                  {/* Tạo mảng dữ liệu mẫu cho bình luận */}
                  {(() => {
                    // Dữ liệu mẫu cho bình luận
                    const commentData = [
                      { id: 1, name: 'Trần Văn Minh', avatar: 'T', color: 'amber', date: '15/06/2023', content: 'Font thư pháp rất đẹp, tôi đã sử dụng cho dự án của mình và khách hàng rất hài lòng!' },
                      { id: 2, name: 'Hoàng Thị Lan', avatar: 'H', color: 'green', date: '10/06/2023', content: 'Tuyệt vời! Font này có nét bút rất mềm mại và tự nhiên.' },
                      { id: 3, name: 'Nguyễn Văn An', avatar: 'A', color: 'blue', date: '05/06/2023', content: 'Tôi rất thích font này, đã sử dụng cho nhiều dự án của mình.' },
                      { id: 4, name: 'Lê Thị Hương', avatar: 'L', color: 'purple', date: '01/06/2023', content: 'Font này có nét bút rất đẹp, phù hợp với các dự án thiết kế của tôi.' },
                      { id: 5, name: 'Phạm Văn Đức', avatar: 'P', color: 'red', date: '28/05/2023', content: 'Tôi đã tìm kiếm một font như thế này từ lâu, cảm ơn vì đã chia sẻ!' },
                      { id: 6, name: 'Vũ Thị Mai', avatar: 'V', color: 'pink', date: '25/05/2023', content: 'Font này rất phù hợp cho các thiết kế hiện đại, tôi rất hài lòng.' },
                      { id: 7, name: 'Đặng Minh Tuấn', avatar: 'Đ', color: 'indigo', date: '20/05/2023', content: 'Đã sử dụng font này cho dự án của công ty, khách hàng rất thích.' },
                      { id: 8, name: 'Trịnh Thị Hà', avatar: 'T', color: 'yellow', date: '15/05/2023', content: 'Font này có nét bút rất đẹp và tự nhiên, rất phù hợp cho các dự án của tôi.' },
                      { id: 9, name: 'Ngô Văn Bình', avatar: 'N', color: 'teal', date: '10/05/2023', content: 'Tôi đã tìm kiếm một font như thế này từ lâu, cảm ơn vì đã chia sẻ!' },
                      { id: 10, name: 'Mai Thị Linh', avatar: 'M', color: 'cyan', date: '05/05/2023', content: 'Font này rất đẹp và dễ sử dụng, tôi rất hài lòng.' },
                      { id: 11, name: 'Hoàng Văn Nam', avatar: 'H', color: 'orange', date: '01/05/2023', content: 'Tôi đã sử dụng font này cho nhiều dự án và luôn hài lòng với kết quả.' },
                      { id: 12, name: 'Lý Thị Hồng', avatar: 'L', color: 'lime', date: '28/04/2023', content: 'Font này có nét bút rất đẹp và tự nhiên, rất phù hợp cho các dự án của tôi.' },
                      { id: 13, name: 'Trương Văn Hùng', avatar: 'T', color: 'emerald', date: '25/04/2023', content: 'Đã sử dụng font này cho dự án của công ty, khách hàng rất thích.' },
                      { id: 14, name: 'Phan Thị Thảo', avatar: 'P', color: 'sky', date: '20/04/2023', content: 'Font này rất phù hợp cho các thiết kế hiện đại, tôi rất hài lòng.' },
                      { id: 15, name: 'Bùi Văn Long', avatar: 'B', color: 'violet', date: '15/04/2023', content: 'Tôi đã tìm kiếm một font như thế này từ lâu, cảm ơn vì đã chia sẻ!' }
                    ];

                    // Tính tổng số trang
                    const totalPages = Math.ceil(commentData.length / commentsPerPage);

                    // Lấy bình luận cho trang hiện tại
                    const currentComments = commentData.slice(
                      (currentCommentPage - 1) * commentsPerPage,
                      currentCommentPage * commentsPerPage
                    );

                    return (
                      <div className="relative">
                        {/* Danh sách bình luận với thanh cuộn */}
                        <div className="max-h-[400px] overflow-y-auto pr-2 mb-16">
                          <div className="space-y-4">
                            {currentComments.map(comment => (
                              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                  <div className={`w-10 h-10 bg-${comment.color}-500 rounded-full flex items-center justify-center text-white font-bold mr-3`}>{comment.avatar}</div>
                                  <div>
                                    <h4 className="font-semibold">{comment.name}</h4>
                                    <p className="text-sm text-gray-500">{comment.date}</p>
                                  </div>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Phân trang và nút gửi phản hồi - luôn ở dưới cùng */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white pt-2 pb-1 flex justify-between items-center">
                          {/* Nút phân trang */}
                          <div className="flex space-x-2">
                            {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => setCurrentCommentPage(i + 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentCommentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>

                          {/* Nút gửi phản hồi ở cuối bên phải */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // Tạo URL của item hiện tại
                              const itemUrl = `${window.location.origin}/category/${categoryType}/${selectedFont.id}`;
                              // Chuyển hướng đến trang phản hồi với URL được truyền qua state
                              navigate('/feedback', { state: { referringUrl: itemUrl } });
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                          >
                            <i className="fas fa-reply mr-2"></i>
                            Gửi phản hồi
                          </button>
                        </div>
                      </div>
                    );
                  })()}
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