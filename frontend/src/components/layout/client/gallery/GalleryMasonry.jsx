// src/components/layout/client/gallery/GalleryMasonry.jsx
import React, { useState, useCallback, memo } from "react";
import GalleryModal from "./GalleryModal";

// Tạo component con để tối ưu hóa việc render lại
const GalleryItem = memo(({ image, onClick }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onClick(image)}
    >
      <img
        src={image.image_url || '/public/logo.png'}
        alt={image.image_title || "Hình ảnh"}
        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        onError={(e) => {
          e.target.src = "/public/logo.png";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-medium">
          {image.image_title || "Không có tiêu đề"}
        </h3>
        <p className="text-gray-200 text-sm mt-1 line-clamp-2">
          {image.category_name || "Không có danh mục"}
        </p>
      </div>
    </div>
  );
});

const GalleryMasonry = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Đảm bảo images luôn là một mảng hợp lệ
  const safeImages = Array.isArray(images) ? images : [];
  
  // Kiểm tra xem mỗi image có đủ thông tin cần thiết không
  const validImages = safeImages.filter(image => {
    return image && typeof image === 'object' && image.image_url;
  });

  return (
    <>
      {validImages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Không có hình ảnh nào để hiển thị
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {validImages.map((image) => (
            <GalleryItem 
              key={image.image_id || `image-${Math.random()}`} 
              image={image} 
              onClick={openModal} 
            />
          ))}
        </div>
      )}

      {selectedImage && <GalleryModal image={selectedImage} onClose={closeModal} />}
    </>
  );
};

export default GalleryMasonry;