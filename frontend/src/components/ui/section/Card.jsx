// src/components/common/Card.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * Card component: Hiển thị nội dung trong khung có viền và bóng đổ
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Nội dung bên trong card
 * @param {string} props.className - Các lớp CSS bổ sung
 */
const Card = ({ children, className = '' }) => {
  const cardClasses = clsx(
    'bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg',
    className
  );

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;