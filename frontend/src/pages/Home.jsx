// src/components/pages/Home.jsx
import React, { useEffect } from 'react';
import Banner from '../components/ui/Banner';
import AccordionItem from '../components/ui/AccordionItem';
import BoxCount from '../components/common/BoxCount';
import FeaturedCourses from '../components/home/FeaturedCourses';
import TestimonialSlider from '../components/home/TestimonialSlider';
import CalligraphyGallery from '../components/home/CalligraphyGallery';

function Home() {
  const [viewCount, setViewCount] = React.useState(0);

  // Tính lượt truy cập từ LocalStorage
  useEffect(() => {
    const storedCount = localStorage.getItem('pageViews');
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    if (!storedCount || isNaN(count)) {
      localStorage.setItem('pageViews', '1');
      setViewCount(1);
    } else {
      setViewCount(count + 1); // Tăng lên mỗi lần truy cập
      localStorage.setItem('pageViews', String(count + 1));
    }
  }, []);

  return (
    <div>
      {/* Banner */}
      <Banner
        title="Nghệ thuật thư pháp"
        subtitle="InkSpire là nền tảng chia sẻ nội dung về thư pháp, giúp các độc giả tìm hiểu về nét đẹp của thư pháp đại chúng và khám phá nghệ thuật viết chữ truyền thống"
        ctaText="Tìm hiểu thêm"
        ctaLink="/courses"
        imageSrc="./banner/home.png"
      />

      {/* Phần mới: AccordionItem */}
      <div className="container mx-auto px-4 md:px-6 mt-8 max-w-screen-lg">
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
           <div className="bg-gray-50 w-full py-10 px-4 sm:px-6 md:px-8 rounded-lg shadow-inner">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <BoxCount count={50} title="Font Chữ" />
            <BoxCount count={150} title="Nghệ Nhân" />
            <BoxCount count={1520} title="Tương Tác" />
            <BoxCount count={viewCount} title="Truy Cập" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;