// src/components/layout/client/gallery/GalleryModal.jsx
import React, { useEffect } from "react";

const GalleryModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const getStatusText = (status) => {
    switch (status) {
      case "published":
        return "Đã xuất bản";
      case "draft":
        return "Bản nháp";
      case "archived":
        return "Đã lưu trữ";
      default:
        return status;
    }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 bg-gray-100">
            <img
              src={image.image_url}
              alt={image.image_title || "Hình ảnh"}
              className="w-full h-auto object-contain max-h-[70vh]"
              onError={(e) => {
                e.target.src = "/images/placeholder.jpg";
              }}
            />
          </div>
          <div className="md:w-1/3 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {image.image_title || "Không có tiêu đề"}
            </h2>
            <p className="text-gray-600 mb-6">
              {image.category_name || "Không có danh mục"}
            </p>

            {image.uploaded_by_name && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Nghệ sĩ</h3>
                <p className="text-gray-800">{image.uploaded_by_name}</p>
              </div>
            )}

            {image.upload_date && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
                <p className="text-gray-800">
                  {new Date(image.upload_date).toLocaleDateString("vi-VN")}
                </p>
              </div>
            )}

            {image.status && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
                <p className="text-gray-800">{getStatusText(image.status)}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={image.image_url}
                download
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l4 4m-4-4H4"
                  />
                </svg>
                Tải xuống
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;