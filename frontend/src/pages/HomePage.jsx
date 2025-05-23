// src/components/pages/Home.jsx
import React, { useEffect } from "react";
import { Banner , AccordionItem , BoxCount , Banner2 } from "../components/common/common";
import { Container, Section } from "../components/ui/ui";
import FeaturedCourses from "../components/layout/client/home/FeaturedCourses";
import TestimonialSlider from "../components/layout/client/home/TestimonialSlider";
import CalligraphyGallery from "../components/layout/client/home/CalligraphyGallery";


function Home() {
  const [viewCount, setViewCount] = React.useState(0);

  // Tính lượt truy cập từ LocalStorage và kiểm tra phiên truy cập
  useEffect(() => {
    // Kiểm tra xem người dùng đã có phiên truy cập chưa
    const hasSession = sessionStorage.getItem("hasVisited");

    // Lấy số lượt truy cập hiện tại từ localStorage
    const storedCount = localStorage.getItem("pageViews");
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    if (!hasSession) {
      // Nếu chưa có phiên truy cập, tăng số lượt truy cập
      const newCount = count + 1;
      localStorage.setItem("pageViews", String(newCount));
      setViewCount(newCount);

      // Đánh dấu đã có phiên truy cập
      sessionStorage.setItem("hasVisited", "true");
    } else {
      // Nếu đã có phiên truy cập, chỉ hiển thị số lượt truy cập hiện tại
      setViewCount(count);
    }
  }, []);

  return (
    <>
      {/* Banner */}
        <Section className="md:py-4">
          <Container className="px-4 sm:px-6 md:px-8">
            <Banner2
              title="Chào mừng đến với inkspire"
              subtitle="Hiểu hơn về thư pháp với inkspire"
              ctaText="Tìm hiểu thêm"
              ctaLink="/calligraphy"
              imageSrc="./banner/home.jpg"
            />
          </Container>
        </Section>
        {/* Phần mới: AccordionItem */}
        <Section py={8} px={4} className="mx-auto max-w-screen-lg md:px-6">
          <AccordionItem
            title="Nguồn gốc thư pháp"
            imageSrc="./pages/home/acor.png"
            content="Thư pháp bắt nguồn từ Trung Quốc cổ đại, phát triển qua nhiều triều đại..."
            link="/calligraphy/history"
          />
          <AccordionItem
            title="Lịch sử thư pháp"
            imageSrc="./pages/home/acor.png"
            content="Thư pháp Việt Nam chịu ảnh hưởng sâu sắc từ thư pháp Trung Hoa..."
            link="/calligraphy/vietnamese-history"
          />
          <AccordionItem
            title="Các loại bút lông"
            imageSrc="./pages/home/acor.png"
            content="Bút lông là công cụ quan trọng nhất trong thư pháp..."
            link="/calligraphy/brushes"
          />
        </Section>
        {/* Khóa học nổi bật */}
        <FeaturedCourses/>
        {/* Đánh giá từ người học */}
        <TestimonialSlider />
        {/* Bộ sưu tập tác phẩm */}
        <CalligraphyGallery />
        {/* Phần thống kê - cải thiện cấu trúc và responsive */}
        <Section className="py-10">
            <Container className="px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-4">
                <BoxCount count={50} title="Font Chữ" />
                <BoxCount count={150} title="Nghệ Nhân" />
                <BoxCount count={1520} title="Tương Tác" />
                <BoxCount count={viewCount} title="Truy Cập" />
              </div>
            </Container>
        </Section>
    </>
  );
}

export default Home;
