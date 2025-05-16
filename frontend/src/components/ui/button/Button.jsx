/* eslint-disable no-unused-vars */
// src/components/common/Button.jsx
import React from 'react';
import clsx from 'clsx';

const Button = ({
  variant = 'default',
  isRound = false,
  isSquare = false,
  iconPath = null,
  content = '',
  size = 'md',
  className = '',
  onClick,
  as: Element = 'button', // Mặc định là button, nhưng có thể đổi thành a, Link,...
  href = '', // Nếu dùng với tag <a>
  children,
  ...props
}) => {
  // Định nghĩa các biến thể màu sắc với cách tiếp cận nhất quán
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    default: 'bg-amber-600 hover:bg-amber-700 text-white',
  };

  // Định nghĩa các kích thước
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Xác định lớp hình dạng dựa trên props
  const shapeClass = isRound
    ? 'rounded-full flex items-center justify-center'
    : isSquare
      ? 'rounded-none flex items-center justify-center'
      : 'rounded-md';

  // Xác định lớp kích thước
  const sizeClass = isRound
    ? 'w-12 h-12'
    : sizes[size] || sizes.md;

  // Lớp cơ bản cho tất cả các nút
  const baseClass = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed';
  const colorClass = variants[variant] || variants.default;

  const buttonClass = clsx(
    baseClass,
    colorClass,
    shapeClass,
    sizeClass,
    className
  );

  return (
    <Element
      className={buttonClass}
      onClick={onClick}
      {...(href ? { href } : {})}
      {...props}
    >
      {iconPath && (
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
            d={iconPath}
          />
        </svg>
      )}
      {!iconPath && content && <span>{content}</span>}
      {children}
    </Element>
  );
};

export default Button;