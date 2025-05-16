// src/components/common/popup/VisitorPopup.jsx
import React, { useState, useEffect } from 'react';

/**
 * VisitorPopup component: Hiển thị popup số lượt truy cập ở góc phải header
 * Popup sẽ biến mất khi người dùng cuộn xuống
 * Có hiệu ứng fadein/fadeout tự động
 */
const VisitorPopup = () => {
  const [viewCount, setViewCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Lấy số lượt truy cập từ localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem('pageViews');
    if (storedCount) {
      setViewCount(parseInt(storedCount, 10));
    }
  }, []);

  // Xử lý sự kiện cuộn trang để ẩn/hiện popup
  useEffect(() => {
    const handleScroll = () => {
      // Ẩn popup khi cuộn xuống quá 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Thêm event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Thêm hiệu ứng nhấp nháy nhẹ khi hiển thị
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  // Thêm hiệu ứng fadein/fadeout tự động
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setIsFading(prev => !prev);
    }, 5000);

    return () => clearInterval(fadeInterval);
  }, []);

  return (
    <div
      className={`absolute right-4 top-4 z-50 flex items-center rounded-2xl bg-amber-100 px-4 py-2 shadow-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} ${isAnimating ? 'scale-105' : 'scale-100'} ${isFading ? 'opacity-80' : 'opacity-100'}`}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="h-5 w-5"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600">Lượt truy cập</p>
        <p className="text-lg font-bold text-amber-800">{viewCount}</p>
      </div>
    </div>
  );
};

export default VisitorPopup;