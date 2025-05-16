// src/components/common/section/BoxCount.jsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import clsx from 'clsx';

/**
 * BoxCount component: Hiển thị số liệu thống kê với hiệu ứng đếm
 * @param {Object} props - Component props
 * @param {number} props.count - Số cần hiển thị
 * @param {string} props.title - Tiêu đề của số liệu
 * @param {string} props.className - Các lớp CSS bổ sung
 */
const BoxCount = ({ count, title, className = '' }) => {
  // Sử dụng state để lưu giá trị hiển thị
  const [displayCount, setDisplayCount] = useState(0);
  
  // Cập nhật giá trị hiển thị khi count thay đổi
  useEffect(() => {
    setDisplayCount(count);
  }, [count]);
  
  const boxClasses = clsx(
    'bg-gray-100 bg-opacity-60 p-6 rounded-lg shadow-md text-center mx-2 transition-all hover:shadow-lg hover:bg-opacity-80',
    className
  );

  return (
    <div className={boxClasses}>
      <CountUp
        start={0}
        end={displayCount}
        duration={2}
        separator=","
        decimals={0}
        className="text-4xl font-bold text-amber-900 mb-2"
      />
      <p className="text-gray-700 font-medium">{title}</p>
    </div>
  );
};

export default BoxCount;