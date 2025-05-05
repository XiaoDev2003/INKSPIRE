// src/pages/Calligraphy.jsx
import React, { useState, useEffect } from "react";
import Banner from "../components/ui/Banner";

const Calligraphy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered] = useState(false);

  const calligraphyTypes = [
    {
      id: 1,
      title: "Tiêu đề kiểu thư pháp 1",
      description: "Mô tả chi tiết về kiểu thư pháp này.",
      imageSrc: "/images/calligraphy-type-1.jpg",
    },
    {
      id: 2,
      title: "Tiêu đề kiểu thư pháp 2",
      description: "Mô tả chi tiết về kiểu thư pháp này.",
      imageSrc: "/images/calligraphy-type-2.jpg",
    },
    {
      id: 3,
      title: "Tiêu đề kiểu thư pháp 3",
      description: "Mô tả chi tiết về kiểu thư pháp này.",
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
  });

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

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div>
          <Banner
            title="Nghệ thuật thư pháp"
            subtitle="InkSpire là nền tảng chia sẻ nội dung về thư pháp, giúp các độc giả tìm hiểu về nét đẹp của thư pháp đại chúng và khám phá nghệ thuật viết chữ truyền thống"
            ctaText="Tìm hiểu thêm"
            ctaLink="/courses"
            imageSrc="./banner/home.png"
          />
        </div>

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
        <div className="relative overflow-hidden">
          <div
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            className="flex transition-transform duration-500"
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
                <div className="bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center bg-black text-center text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div className="bg-opacity-60 rounded-lg bg-gray-100 p-4 shadow-md backdrop-blur-sm">
                    <h2 className="text-xl font-bold">{type.title}</h2>
                    <p className="text-sm">{type.description}</p>
                    <button className="mt-4 inline-block rounded-md bg-amber-500 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-amber-700">
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calligraphy;
