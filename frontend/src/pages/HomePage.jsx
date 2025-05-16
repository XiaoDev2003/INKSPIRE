// src/components/pages/Home.jsx
import React, { useEffect } from "react";
import { Banner , AccordionItem , BoxCount } from "../components/common/common";
import { Container, Section } from "../components/ui/ui";
import FeaturedCourses from "../components/layout/client/home/FeaturedCourses";
import TestimonialSlider from "../components/layout/client/home/TestimonialSlider";
import CalligraphyGallery from "../components/layout/client/home/CalligraphyGallery";

function Home() {
  const [viewCount, setViewCount] = React.useState(0);

  // Tính lượt truy cập từ LocalStorage
  useEffect(() => {
    const storedCount = localStorage.getItem("pageViews");
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    if (!storedCount || isNaN(count)) {
      localStorage.setItem("pageViews", "1");
      setViewCount(1);
    } else {
      setViewCount(count + 1); // Tăng lên mỗi lần truy cập
      localStorage.setItem("pageViews", String(count + 1));
    }
  }, []);

  return (
    <>
      {/* Banner */}
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

      {/* Phần mới: AccordionItem */}
      <div className="container mx-auto mt-8 max-w-screen-lg px-4 md:px-6">
        <AccordionItem
          title="Nguồn gốc thư pháp"
          imageSrc="/images/calligraphy-origin.jpg"
          content="Thư pháp bắt nguồn từ Trung Quốc cổ đại, phát triển qua nhiều triều đại..."
          link="/calligraphy/history"
        />
        <AccordionItem
          title="Lịch sử thư pháp"
          imageSrc="/images/calligraphy-history.jpg"
          content="Thư pháp Việt Nam chịu ảnh hưởng sâu sắc từ thư pháp Trung Hoa..."
          link="/calligraphy/vietnamese-history"
        />
        <AccordionItem
          title="Các loại bút lông"
          imageSrc="/images/calligraphy-brushes.jpg"
          content="Bút lông là công cụ quan trọng nhất trong thư pháp..."
          link="/calligraphy/brushes"
        />
      </div>

      {/* Khóa học nổi bật */}
      <FeaturedCourses />

      {/* Đánh giá từ người học */}
      <TestimonialSlider />

      {/* Bộ sưu tập tác phẩm */}
      <CalligraphyGallery />

      {/* Phần mới: Thống kê - bao ngoài là container to hơn, có padding và nền xám */}
      <div className="w-full rounded-lg bg-gray-50 px-4 py-10 shadow-inner sm:px-6 md:px-8">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <BoxCount count={50} title="Font Chữ" />
            <BoxCount count={150} title="Nghệ Nhân" />
            <BoxCount count={1520} title="Tương Tác" />
            <BoxCount count={viewCount} title="Truy Cập" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
