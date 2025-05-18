// Grid.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * Grid Component - Bố cục dạng lưới đơn giản, hỗ trợ responsive
 *
 * @param {React.ElementType} as - Element type (default: div)
 * @param {number} cols - Số cột mặc định
 * @param {number} sm - Số cột trên màn hình nhỏ
 * @param {number} md - Số cột trên màn hình trung bình
 * @param {number} lg - Số cột trên màn hình lớn
 * @param {number} xl - Số cột trên màn hình rất lớn
 * @param {string|number} gap - Khoảng cách giữa các ô (sử dụng giá trị Tailwind gap)
 * @param {string} className - Class tùy chỉnh thêm
 * @param {React.ReactNode} children - Nội dung con
 */
const Grid = ({
  as: Element = 'div',
  cols,
  sm,
  md,
  lg,
  xl,
  gap,
  className = '',
  children,
}) => {
  const gridClasses = clsx(
    'grid',
    cols && `grid-cols-${cols}`,
    sm && `sm:grid-cols-${sm}`,
    md && `md:grid-cols-${md}`,
    lg && `lg:grid-cols-${lg}`,
    xl && `xl:grid-cols-${xl}`,
    gap != null && `gap-${gap}`,
    className
  );

  return <Element className={gridClasses}>{children}</Element>;
};

export default Grid;