// src/components/Banner/Banner.jsx
import React from "react";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import { Box } from "../../components/ui/Layout";
import Flex from "../../components/ui/Style";

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
          <Button to={ctaLink} variant="secondary">
            {ctaText} <span className="ml-2">🡒</span>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Banner;
