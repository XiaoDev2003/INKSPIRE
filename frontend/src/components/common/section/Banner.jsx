// src/components/Banner/Banner.jsx
import React from "react";
import { Text, Button, Image, Box, Flex } from '../../ui/ui';

const Banner = ({
  title = "null",
  subtitle = "Học viết chữ truyền thống & cảm nhận nét đẹp văn hóa Á Đông",
  ctaText = "Khóa học dành cho bạn",
  ctaLink = "/courses",
  imageSrc = "/images/banner-calligraphy.jpg",

  // Các props tùy biến cho Image
  Ratio = "full", // Tỷ lệ khung hình
  ClassName = "", // Class tùy chỉnh cho hình ảnh
}) => {
  return (
    <Box className="bg-gray relative overflow-hidden rounded-xl" shadow="true">
      <Image src={imageSrc} alt={title} ratio={Ratio} className={ClassName} />

      {/* Nội dung bên dưới hình ảnh */}
      <Box className="bg-opacity-60 space-y-6 bg-gray-100 p-6 backdrop-blur-sm md:p-8">
        {/* Tiêu đề */}
        <Text
          as="h1"
          size="4xl"
          weight="bold"
          color="text-amber-900"
          className="mx-auto max-w-2xl text-center"
        >
          {title}
        </Text>

        {/* Mô tả ngắn */}
        <Text
          as="p"
          size="lg"
          color="text-gray-700"
          className="mx-auto max-w-2xl text-center"
        >
          {subtitle}
        </Text>

        {/* Nút hành động */}
        <Flex className="mt-4" justify="center">
          <Button
            variant="secondary" // Thay đổi này
            size="md"
            as="a"
            href={ctaLink}
            className="px-6 py-3"
          >
            {ctaText} <span className="ml-2">🡒</span>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Banner;