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
      className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative m-4 max-h-[95vh] w-full max-w-7xl transform overflow-auto rounded-lg bg-white shadow-2xl transition-all duration-300"
        onClick={handleContentClick}
      >
        <button
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 text-gray-400 shadow-md hover:text-gray-600"
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
          <div className="bg-gray-100 md:w-3/4">
            <img
              src={image.image_url}
              alt={image.image_title || "Hình ảnh"}
              className="h-auto max-h-[80vh] w-full object-contain"
              onError={(e) => {
                e.target.src = "/images/placeholder.jpg";
              }}
            />
          </div>
          <div className="flex h-full flex-col p-6 md:w-1/4">
            {/* Tiêu đề */}
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              {image.image_title || "Không có tiêu đề"}
            </h2>

            {/* Danh mục */}
            <p className="mb-4 text-gray-600">
              {image.category_name || "Không có danh mục"}
            </p>

            {/* Mô tả */}
            {image.image_description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Mô tả</h3>
                <p className="mt-1 text-gray-800">{image.image_description}</p>
              </div>
            )}

            {/* Tác giả */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Tác giả</h3>
              <p className="mt-1 text-gray-800">{image.uploaded_by_name || "Không xác định"}</p>
            </div>

            {/* Ngày tạo */}
            {image.upload_date && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
                <p className="mt-1 text-gray-800">
                  {new Date(image.upload_date).toLocaleDateString("vi-VN")}
                </p>
              </div>
            )}

            {/* Trạng thái */}
            {image.status && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Trạng thái
                </h3>
                <p className="mt-1 text-gray-800">
                  {getStatusText(image.status)}
                </p>
              </div>
            )}

            {/* Nút tải xuống được căn giữa */}
            <div className="mt-auto flex justify-center border-t border-gray-200 pt-6">
              <a
                href={image.image_url}
                download
                className="inline-flex items-center rounded-md border border-transparent bg-amber-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
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
