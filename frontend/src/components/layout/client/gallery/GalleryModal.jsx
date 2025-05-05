// src/components/layout/client/gallery/GalleryModal.jsx
import React, { useEffect } from 'react';

const GalleryModal = ({ image, onClose }) => {
  // Thêm event listener để đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Vô hiệu hóa cuộn trang khi modal mở
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Ngăn sự kiện click từ việc lan truyền đến overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto m-4 shadow-2xl transform transition-all duration-300"
        onClick={handleContentClick}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 bg-gray-100">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-auto object-contain max-h-[70vh]"
            />
          </div>
          <div className="md:w-1/3 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{image.alt}</h2>
            <p className="text-gray-600 mb-6">{image.description}</p>
            
            {image.artist && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Nghệ sĩ</h3>
                <p className="text-gray-800">{image.artist}</p>
              </div>
            )}
            
            {image.date && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
                <p className="text-gray-800">{image.date}</p>
              </div>
            )}

            {image.technique && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Kỹ thuật</h3>
                <p className="text-gray-800">{image.technique}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Yêu thích
              </button>
              <button className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;