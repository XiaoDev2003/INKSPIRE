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
        <img 
          src="./pages/home/classic.png" 
          alt="Bút lông cổ điển" 
          className="h-6 w-6 object-contain"
        />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-600">Lượt truy cập</p>
        <p className="text-lg font-bold text-amber-800">{viewCount}</p>
      </div>
    </div>
  );
};

export default VisitorPopup;