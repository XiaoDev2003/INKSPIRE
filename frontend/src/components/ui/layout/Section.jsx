/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

/**
 * Section component: Bao ngoài phần nội dung với các tùy chọn padding và shadow
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - Element type to render
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Child elements
 * @param {boolean} props.shadow - Whether to add shadow
 * @param {string|number} props.py - Padding Y (top/bottom)
 * @param {string|number} props.px - Padding X (left/right)
 */
const Section = ({
  as: Element = 'div',
  className = '',
  children,
  shadow = false,
  py = '',
  px = '',
}) => {
  // Xử lý padding theo cách nhất quán
  const paddingY = py ? `py-${py}` : '';
  const paddingX = px ? `px-${px}` : '';

  // Kết hợp các lớp CSS
  const finalClassName = clsx(
    'transition-all', // Thêm hiệu ứng chuyển đổi mượt mà
    paddingY,
    paddingX,
    shadow && 'shadow-md',
    className
  );

  return (
    <Element className={finalClassName}>
      {children}
    </Element>
  );
};

export default Section;