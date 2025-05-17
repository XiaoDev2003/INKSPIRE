/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Banner } from "../components/common/common";
import CalligraphyTypes from "../components/layout/client/calligraphy/CalligraphyTypes";
import CalligraphyTools from "../components/layout/client/calligraphy/CalligraphyTools";
import CalligraphyTechniques from "../components/layout/client/calligraphy/CalligraphyTechniques";
import CalligraphyCategory from "../components/layout/client/calligraphy/CalligraphyCategory";
import { Container, Section, Text, Button } from "../components/ui/ui";

const Calligraphy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const calligraphyTypes = [
    {
      id: 1,
      title: "Thư pháp truyền thống",
      description:
        "Nghệ thuật viết chữ truyền thống với bút lông và mực Tàu, thể hiện vẻ đẹp của văn hóa Á Đông.",
      imageSrc: "/banner/traditional.png",
    },
    {
      id: 2,
      title: "Thư pháp hiện đại",
      description:
        "Kết hợp giữa kỹ thuật truyền thống và phong cách đương đại, tạo nên những tác phẩm độc đáo và sáng tạo.",
      imageSrc: "/images/calligraphy-type-2.jpg",
    },
    {
      id: 3,
      title: "Thư pháp Latinh",
      description:
        "Nghệ thuật viết chữ đẹp với bảng chữ cái Latinh, sử dụng nhiều loại bút và phong cách khác nhau.",
      imageSrc: "/images/calligraphy-type-3.jpg",
    },
  ];

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === calligraphyTypes.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, calligraphyTypes.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? calligraphyTypes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === calligraphyTypes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentType = calligraphyTypes[currentIndex];

  return (
    <>
      {/* Banner */}
      <Section py="0" className="md:py-12">
        <Container className="px-4 sm:px-6 md:px-8">
          <Banner
            title="Nghệ thuật thư pháp"
            subtitle="InkSpire là nền tảng chia sẻ nội dung về thư pháp, giúp các độc giả tìm hiểu về nét đẹp của thư pháp đại chúng và khám phá nghệ thuật viết chữ truyền thống"
            ctaText="Tìm hiểu thêm"
            ctaLink="/courses"
            imageSrc="./banner/home.png"
          />
        </Container>
      </Section>

      {/* Slideshow + Controls */}
      <Section className="bg-white" py={12}>
        <Container className="px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <Text
              as="h2"
              size="3xl"
              weight="bold"
              color="text-gray-800"
              className="mb-6 text-xl sm:text-2xl md:text-3xl"
              isHeading={true}
              line={true}
            >
              Khám phá các phong cách thư pháp
            </Text>

            <div className="mb-8 flex justify-center space-x-2">
              <Button
                variant="default"
                size="md"
                className="rounded-l-md px-2 py-1 sm:px-4 sm:py-2 font-bold text-sm sm:text-base"
                onClick={handlePrev}
              >
                ← Trước
              </Button>

              <Button
                variant="default"
                size="md"
                className="rounded-r-md px-2 py-1 sm:px-4 sm:py-2 font-bold text-sm sm:text-base"
                onClick={handleNext}
              >
                Tiếp →
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-in-out">
            <div
              className="relative h-48 w-full overflow-hidden bg-cover bg-center sm:h-64 md:h-96"
              style={{ backgroundImage: `url(${currentType.imageSrc})` }}
            >
              {/* Overlay màu đen mờ */}
              <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-lg p-3 sm:p-6 text-center text-white">
                  <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold">
                    {currentType.title}
                  </h2>
                  <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                    {currentType.description}
                  </p>
                  <Button
                    variant="default"
                    size="md"
                    className="rounded-md font-bold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="absolute right-0 bottom-2 sm:bottom-4 left-0">
              <div className="flex justify-center space-x-2">
                {calligraphyTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                      index === currentIndex ? "bg-amber-500" : "bg-opacity-50 bg-white"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Các phần còn lại */}
      <Section className="bg-gray-50" py={12}>
        <Container className="px-4 sm:px-6 md:px-8">
          <CalligraphyCategory />
        </Container>
      </Section>

      <Section className="bg-white" py={12}>
        <Container className="px-4 sm:px-6 md:px-8">
          <CalligraphyTypes types={calligraphyTypes} />
        </Container>
      </Section>

      <Section className="bg-gray-50" py={12}>
        <Container className="px-4 sm:px-6 md:px-8">
          <CalligraphyTools />
        </Container>
      </Section>

      <Section className="bg-white" py={12}>
        <Container className="px-4 sm:px-6 md:px-8">
          <CalligraphyTechniques />
        </Container>
      </Section>
    </>
  );
};

export default Calligraphy;