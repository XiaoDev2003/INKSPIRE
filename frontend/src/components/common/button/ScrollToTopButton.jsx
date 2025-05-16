// src/components/common/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

/**
 * ScrollToTopButton component: Hiển thị nút cuộn lên đầu trang khi người dùng cuộn xuống
 * @returns {JSX.Element} Nút cuộn lên đầu trang
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi vị trí cuộn và hiển thị nút khi cần
  useEffect(() => {
    // Ngưỡng hiển thị nút (px)
    const SCROLL_THRESHOLD = 300;
    
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > SCROLL_THRESHOLD);
    };

    // Thêm sự kiện cuộn với throttle để tối ưu hiệu suất
    let timeoutId;
    const throttledScrollHandler = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          toggleVisibility();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  // Xử lý sự kiện khi nhấp vào nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Tạo lớp CSS cho container
  const containerClasses = clsx(
    'fixed bottom-6 right-6 z-50 transition-all duration-300',
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
  );

  // Tạo lớp CSS cho nút
  const buttonClasses = clsx(
    'p-3 bg-amber-600 text-white rounded-full shadow-lg',
    'hover:bg-amber-700 hover:shadow-xl',
    'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
    'transform transition-transform hover:scale-110'
  );

  return (
    <div className={containerClasses}>
      <button
        onClick={scrollToTop}
        className={buttonClasses}
        aria-label="Cuộn lên đầu trang"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTopButton;