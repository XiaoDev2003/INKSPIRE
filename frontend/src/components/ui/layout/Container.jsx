/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

/**
 * Container component: Giới hạn chiều rộng + padding động
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - Element type to render
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Child elements
 * @param {string|number} props.py - Padding Y (top/bottom)
 * @param {string|number} props.px - Padding X (left/right)
 */
const Container = ({
  as: Element = 'div',
  className = '',
  children,
  py = '',
  px = '',
}) => {
  // Xử lý padding theo cách nhất quán
  const paddingY = py ? `py-${py}` : '';
  const paddingX = px ? `px-${px}` : '';

  // Kết hợp các lớp CSS
  const containerClass = clsx(
    'mx-auto w-full max-w-screen-xl', // Thêm max-width để đảm bảo tính nhất quán
    paddingY,
    paddingX,
    className
  );

  return (
    <Element className={containerClass}>
      {children}
    </Element>
  );
};

export default Container;