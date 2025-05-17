// src/pages/Gallery.jsx
import React, { useState } from "react";
import GalleryFilter from "../components/layout/client/gallery/GalleryFilter";
import GalleryMasonry from "../components/layout/client/gallery/GalleryMasonry";
import GalleryUpload from "../components/layout/client/gallery/GalleryUpload";
import { Banner } from '../components/common/common';
import { Container, Section } from "../components/ui/ui";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categories = [
    { id: "traditional", name: "Thư pháp truyền thống" },
    { id: "modern", name: "Thư pháp hiện đại" },
    { id: "brush", name: "Bút lông" },
    { id: "calligraphy", name: "Calligraphy" },
    { id: "digital", name: "Thư pháp số" },
  ];

  const images = [
    {
      src: "/images/gallery/brush-lettering.jpg",
      alt: "Brush Lettering",
      description: "Hình ảnh minh họa về nghệ thuật thư pháp bằng cọ.",
      category: "brush",
      artist: "Nguyễn Văn A",
      date: "15/04/2023",
      technique: "Bút lông trên giấy dó",
    },
    {
      src: "/images/gallery/candle-and-pen.jpg",
      alt: "You're the One",
      description: 'Một bức thư pháp với dòng chữ "You\'re the One".',
      category: "modern",
      artist: "Trần Thị B",
      date: "22/06/2023",
      technique: "Mực tàu trên giấy thủ công",
    },
    {
      src: "/images/gallery/dream-bigger.jpg",
      alt: "Let Your Dream Be Bigger Than Your Fears",
      description:
        'Bức thư pháp truyền cảm hứng với câu nói "Let Your Dream Be Bigger Than Your Fears".',
      category: "calligraphy",
      artist: "Lê Văn C",
      date: "10/08/2023",
      technique: "Bút sắt trên giấy mỹ thuật",
    },
    {
      src: "/images/gallery/writing-process.jpg",
      alt: "Writing Process",
      description: "Quá trình viết thư pháp đang diễn ra.",
      category: "traditional",
      artist: "Phạm Thị D",
      date: "05/03/2023",
      technique: "Bút lông truyền thống",
    },
    {
      src: "/images/gallery/brush-lettering.jpg",
      alt: "Digital Calligraphy",
      description: "Tác phẩm thư pháp số được tạo bằng công nghệ kỹ thuật số.",
      category: "digital",
      artist: "Hoàng Văn E",
      date: "30/09/2023",
      technique: "iPad Pro với Apple Pencil",
    },
    {
      src: "/images/gallery/candle-and-pen.jpg",
      alt: "Hành trình",
      description:
        "Tác phẩm thể hiện hành trình của cuộc sống qua những nét chữ uốn lượn.",
      category: "traditional",
      artist: "Vũ Thị F",
      date: "12/07/2023",
      technique: "Mực nho trên lụa",
    },
  ];

  // Lọc hình ảnh theo danh mục đang chọn
  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((image) => image.category === activeCategory);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
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
        {/* Header section with upload button handler */}
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
            <button className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-2 font-medium text-gray-800 shadow-sm transition-colors duration-300 hover:bg-gray-100 hover:shadow-md">
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Xem tất cả
            </button>
          </div>
        </div>

        {/* Filter section */}
        <GalleryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Gallery masonry grid */}
        <GalleryMasonry images={filteredImages} />

        {/* Pagination section */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Trước
            </a>
            <a
              href="#"
              className="border border-amber-500 bg-amber-500 px-4 py-2 text-sm font-medium text-white"
            >
              1
            </a>
            <a
              href="#"
              className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Sau
            </a>
          </nav>
        </div>
      </div>

      {/* Upload Modal */}
      <GalleryUpload isOpen={isUploadModalOpen} onClose={closeUploadModal} />
    </>
  );
};

export default Gallery;
