// src/components/Banner/Banner.jsx
import React from 'react';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import Image from '../../components/ui/Image';
import { Box, Container, Section } from '../../components/ui/Layout';

const Banner = ({
  title = "Khám phá nghệ thuật thư pháp",
  subtitle = "Học viết chữ truyền thống & cảm nhận nét đẹp văn hóa Á Đông",
  ctaText = "Khóa học dành cho bạn",
  ctaLink = "/courses",
  imageSrc = "/images/banner-calligraphy.jpg",

  // Các props tùy biến cho Image
  imageRatio = 'full',     // Tỷ lệ khung hình
  imageOverlay,            // Lớp phủ mờ (class Tailwind)
  imageClassName = '',     // Class tùy chỉnh cho hình ảnh
}) => {
  return (
        <Box className="relative bg-gray rounded-xl overflow-hidden" shadow='true'>
          {/* Hình ảnh */}
          <div className="relative overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              ratio={imageRatio}
              className={imageClassName}
            />

            {/* Lớp phủ nếu có */}
            {imageOverlay && <div className={`absolute inset-0 ${imageOverlay}`}></div>}
          </div>

          {/* Nội dung bên dưới hình ảnh */}
          <div className="p-6 md:p-8 space-y-6 bg-gray-100 bg-opacity-60 backdrop-blur-sm">
            {/* Tiêu đề */}
            <Text as="h1" size="4xl" weight="bold" color="text-amber-900" className="text-center max-w-2xl mx-auto">
              {title}
            </Text>

            {/* Mô tả ngắn */}
            <Text as="p" size="lg" color="text-gray-700" className="text-center max-w-2xl mx-auto">
              {subtitle}
            </Text>

            {/* Nút hành động */}
            <div className="flex justify-center mt-4">
              <Button to={ctaLink} variant="secondary">
                {ctaText} <span className="ml-2">🡒</span>
              </Button>
            </div>
          </div>
        </Box>
  );
};

export default Banner;