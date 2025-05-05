// src/components/layout/client/calligraphy/TestimonialSlider.jsx
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Học viên khóa Thư pháp cơ bản",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Khóa học đã giúp tôi hiểu rõ hơn về nghệ thuật thư pháp và cách cầm bút đúng. Giáo viên rất tận tâm và luôn sẵn sàng giải đáp mọi thắc mắc."
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Nghệ nhân thư pháp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Tôi đã tham gia nhiều khóa học thư pháp nhưng Inkspire thực sự nổi bật với phương pháp giảng dạy chi tiết và tài liệu phong phú. Đây là nơi tuyệt vời để phát triển kỹ năng."
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Sinh viên Mỹ thuật",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content: "Nền tảng này đã mở ra cho tôi một thế giới mới về nghệ thuật thư pháp. Các bài giảng rõ ràng và dễ hiểu, phù hợp với cả người mới bắt đầu."
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Chuyển đến slide trước đó
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <section className="py-12 bg-amber-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Người học nói gì về chúng tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá trải nghiệm của những người đã tham gia các khóa học thư pháp tại Inkspire
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Nút điều hướng trái */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonial hiện tại */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10 transition-all duration-500 transform">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-200" 
                />
              </div>
              
              <div className="flex-grow">
                <div className="text-amber-500 mb-4">
                  <i className="fa-solid fa-quote-left text-3xl opacity-50"></i>
                </div>
                
                <p className="text-gray-700 italic mb-6">
                  {testimonials[currentIndex].content}
                </p>
                
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nút điều hướng phải */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Chỉ số slide */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-amber-500' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;