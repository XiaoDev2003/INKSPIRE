// src/pages/Calligraphy.jsx
import React, { useState, useEffect, useRef } from "react";
import { Banner } from '../components/common/common';
import CalligraphyTypes from "../components/layout/client/calligraphy/CalligraphyTypes";
import CalligraphyTools from "../components/layout/client/calligraphy/CalligraphyTools";
import CalligraphyTechniques from "../components/layout/client/calligraphy/CalligraphyTechniques";
import CalligraphyCategory from "../components/layout/client/calligraphy/CalligraphyCategory";

const Calligraphy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  const calligraphyTypes = [
    {
      id: 1,
      title: "Thư pháp truyền thống",
      description: "Nghệ thuật viết chữ truyền thống với bút lông và mực Tàu, thể hiện vẻ đẹp của văn hóa Á Đông.",
      imageSrc: "/images/calligraphy-type-1.jpg",
    },
    {
      id: 2,
      title: "Thư pháp hiện đại",
      description: "Kết hợp giữa kỹ thuật truyền thống và phong cách đương đại, tạo nên những tác phẩm độc đáo và sáng tạo.",
      imageSrc: "/images/calligraphy-type-2.jpg",
    },
    {
      id: 3,
      title: "Thư pháp Latinh",
      description: "Nghệ thuật viết chữ đẹp với bảng chữ cái Latinh, sử dụng nhiều loại bút và phong cách khác nhau.",
      imageSrc: "/images/calligraphy-type-3.jpg",
    },
    // Thêm nhiều kiểu thư pháp nếu cần
  ];

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === calligraphyTypes.length - 1 ? 0 : prevIndex + 1,
        );
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, calligraphyTypes.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? calligraphyTypes.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === calligraphyTypes.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="py-8">
          <Banner
            title="Nghệ thuật thư pháp"
            subtitle="InkSpire là nền tảng chia sẻ nội dung về thư pháp, giúp các độc giả tìm hiểu về nét đẹp của thư pháp đại chúng và khám phá nghệ thuật viết chữ truyền thống"
            ctaText="Tìm hiểu thêm"
            ctaLink="/courses"
            imageSrc="./banner/home.png"
          />
        </div>

        {/* Carousel section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">Khám phá các phong cách thư pháp</h2>

          {/* Carousel controls */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={handlePrev}
              className="rounded-l-md bg-amber-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-amber-700"
            >
              ← Trước
            </button>
            <button
              onClick={handleNext}
              className="rounded-r-md bg-amber-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-amber-700"
            >
              Tiếp →
            </button>
          </div>

          {/* Carousel content */}
          <div
            className="relative overflow-hidden rounded-lg shadow-lg"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              className="flex transition-transform duration-700 ease-in-out"
            >
              {calligraphyTypes.map((type) => (
                <div
                  key={type.id}
                  className="relative h-64 w-full overflow-hidden sm:h-96"
                >
                  <img
                    src={type.imageSrc}
                    alt={type.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-6 max-w-lg">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{type.title}</h2>
                      <p className="text-sm md:text-base mb-4">{type.description}</p>
                      <button className="inline-block rounded-md bg-amber-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-amber-700">
                        Tìm hiểu thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center space-x-2">
                {calligraphyTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-amber-500' : 'bg-white bg-opacity-50'}`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integrate new components */}
        <CalligraphyCategory />
        <CalligraphyTypes types={calligraphyTypes} />
        <CalligraphyTools />
        <CalligraphyTechniques />
      </div>
    </div>
  );
};

export default Calligraphy;
