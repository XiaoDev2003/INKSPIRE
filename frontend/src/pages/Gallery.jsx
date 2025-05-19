// src/pages/Gallery.jsx
import React, { useState, useEffect } from "react";
import GalleryFilter from "../components/layout/client/gallery/GalleryFilter";
import GalleryMasonry from "../components/layout/client/gallery/GalleryMasonry";
import GalleryUpload from "../components/layout/client/gallery/GalleryUpload";
import { Banner } from "../components/common/common";
import { Container, Section } from "../components/ui/ui";
import axiosClient from "../api/axiosClient";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // Số ảnh mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [galleryResponse, categoriesResponse] = await Promise.all([
          axiosClient.get("/api/gallery"),
          axiosClient.get("/api/categories"),
        ]);
        setImages(galleryResponse.data);
        // Chỉ lấy các danh mục có trạng thái 'published'
        const publishedCategories = categoriesResponse.data.filter(
          (category) => category.status === 'published'
        );
        setCategories(publishedCategories);
      } catch (err) {
        setError(err.response?.data?.error || "Đã có lỗi khi lấy dữ liệu.");
        console.error("Error fetching data:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc ảnh theo danh mục và trạng thái
  const filteredImages = images.filter((image) => {
    // Chỉ hiển thị hình ảnh có trạng thái 'published'
    if (image.status !== 'published') return false;
    
    // Kiểm tra xem danh mục của hình ảnh có tồn tại và có trạng thái 'published' không
    const imageCategory = categories.find(cat => cat.category_id === image.category_id);
    if (!imageCategory || imageCategory.status !== 'published') return false;
    
    // Lọc theo danh mục ID thay vì category_type
    if (activeCategory === "all") return true;
    
    // So sánh trực tiếp với category_id
    return image.category_id === parseInt(activeCategory);
  });

  // Tính toán phân trang
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi category
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Section py="0" className="md:py-12">
        <Container className="container">
          <Banner
            title="Bút lông cổ điển"
            subtitle="Hiểu hơn về công cụ truyền thống"
            ctaText="Tìm hiểu thêm"
            ctaLink="/brushes"
            imageSrc="./banner/home.png"
          />
        </Container>
      </Section>

      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <div></div>
          <div className="mt-6">
            <button
              onClick={openUploadModal}
              className="mr-3 inline-flex items-center rounded-full bg-amber-500 px-6 py-2 font-medium text-white shadow-md transition-colors duration-300 hover:bg-amber-600 hover:shadow-lg"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Đóng góp tác phẩm
            </button>
          </div>
        </div>

        <GalleryFilter
          categories={categories.map((cat) => ({
            id: cat.category_id.toString(), // Sử dụng category_id thay vì category_type
            name: cat.category_name,
          }))}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          <GalleryMasonry images={currentImages} />
        )}

        {filteredImages.length > 0 && (
          <div className="mt-12 flex justify-center py-12">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`border px-4 py-2 text-sm font-medium ${
                    currentPage === i + 1
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>

      <GalleryUpload isOpen={isUploadModalOpen} onClose={closeUploadModal} />
    </>
  );
};

export default Gallery;