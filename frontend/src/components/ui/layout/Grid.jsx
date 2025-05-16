import React from 'react';

/**
 * Grid Component - Thành phần bố cục dạng lưới sử dụng CSS Grid
 * 
 * @param {number|string} cols - Số cột: số cụ thể hoặc 'auto-fill', 'auto-fit'
 * @param {number} rows - Số hàng
 * @param {string} gap - Khoảng cách giữa các phần tử: 'none', 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} colGap - Khoảng cách giữa các cột
 * @param {string} rowGap - Khoảng cách giữa các hàng
 * @param {string} sm - Số cột ở breakpoint sm (640px)
 * @param {string} md - Số cột ở breakpoint md (768px)
 * @param {string} lg - Số cột ở breakpoint lg (1024px)
 * @param {string} xl - Số cột ở breakpoint xl (1280px)
 * @param {string} className - Class tùy chỉnh thêm
 * @param {React.ReactNode} children - Các phần tử con
 */
const Grid = ({
  as: Element = 'div',
  cols = 1,
  rows,
  gap = 'md',
  colGap,
  rowGap,
  sm,
  md,
  lg,
  xl,
  className = '',
  children,
  ...props
}) => {
  // Ánh xạ các giá trị gap sang class Tailwind
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const colGapClasses = {
    none: 'gap-x-0',
    xs: 'gap-x-1',
    sm: 'gap-x-2',
    md: 'gap-x-4',
    lg: 'gap-x-6',
    xl: 'gap-x-8',
  };

  const rowGapClasses = {
    none: 'gap-y-0',
    xs: 'gap-y-1',
    sm: 'gap-y-2',
    md: 'gap-y-4',
    lg: 'gap-y-6',
    xl: 'gap-y-8',
  };

  // Xử lý số cột
  const getGridCols = (columns) => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }
    
    if (columns === 'auto-fill') {
      return 'grid-cols-auto-fill';
    }
    
    if (columns === 'auto-fit') {
      return 'grid-cols-auto-fit';
    }
    
    return 'grid-cols-1';
  };

  // Xây dựng class dựa trên props
  const gridClasses = [
    'grid',
    getGridCols(cols),
    rows && `grid-rows-${rows}`,
    !colGap && !rowGap && gapClasses[gap],
    colGap && colGapClasses[colGap],
    rowGap && rowGapClasses[rowGap],
    sm && `sm:${getGridCols(sm)}`,
    md && `md:${getGridCols(md)}`,
    lg && `lg:${getGridCols(lg)}`,
    xl && `xl:${getGridCols(xl)}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Element className={gridClasses} {...props}>
      {children}
    </Element>
  );
};

export default Grid;