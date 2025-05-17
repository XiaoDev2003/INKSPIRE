// src/components/Banner/Banner2.jsx
import React from "react";
import { Text, Button, Flex, Image } from '../../ui/ui';

const Banner2 = ({
  title = "YOU CAN HELP MAKE A DIFFERENCE",
  subtitle = "Since 1989, the Danville Public School Foundation has endeavored to promote, aid, and encourage enhanced educational opportunities for the students of the Danville Public Schools beyond those provided through tax dollars.",
  ctaText = "LEARN MORE",
  ctaLink = "/learn-more",
  imageSrc = "/images/banner-foundation.jpg",
}) => {
  return (
    <div className="relative overflow-hidden shadow-lg h-[600px]">
      {/* Hình nền */}
      <Image
        src={imageSrc}
        alt={title}
        ratio="full"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Nội dung banner - position absolute + z-index */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="text-center max-w-2xl">
          {/* Tiêu đề */}
          <Text
            as="h1"
            size="4xl"
            weight="bold"
            color="text-black"
            className="mb-4 drop-shadow-md"
          >
            {title}
          </Text>

          {/* Mô tả ngắn */}
          <Text
            as="p"
            size="md"
            color="text-white"
            className="mb-8 max-w-lg mx-auto drop-shadow-sm"
          >
            {subtitle}
          </Text>

          {/* Nút hành động */}
          <Flex gap="4" justify="center">
            <Button
              size="md"
              as="a"
              href={ctaLink}
              className="px-6 py-3"
            >
              {ctaText}
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Banner2;