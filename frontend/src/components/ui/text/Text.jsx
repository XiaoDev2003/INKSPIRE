// src/components/ui/Text/Text.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * Text component: Hiển thị văn bản với các tùy chọn về kích thước, độ đậm và màu sắc
 * @param {Object} props - Component props
 * @param {React.ElementType} props.as - Element type to render (p, h1, h2, etc.)
 * @param {string} props.size - Text size (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
 * @param {string} props.weight - Font weight (thin, light, normal, medium, semibold, bold)
 * @param {string} props.color - Text color class
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isHeading - Force heading font family
 * @param {boolean} props.line - Hiển thị đường kẻ ngang dưới văn bản
 * @param {React.ReactNode} props.children - Child elements
 */
const Text = ({
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-gray-700',
  className = '',
  isHeading = false,
  line = false,
  children
}) => {
  // Định nghĩa các kích thước văn bản
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  // Định nghĩa các độ đậm của font
  const weights = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // Xác định font family dựa trên loại text
  const isHeadingTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(Tag);
  const fontFamily = isHeading || isHeadingTag ? 'font-heading' : 'font-body';

  // Xác định style cho đường kẻ ngang
  const lineStyle = line ? 'border-b-2 border-amber-500 pb-2 inline-block' : '';

  // Kết hợp các lớp CSS
  const textClasses = clsx(
    sizes[size] || sizes.base,
    weights[weight] || weights.normal,
    color,
    fontFamily,
    lineStyle,
    className
  );

  return (
    <Tag className={textClasses}>
      {children}
    </Tag>
  );
};

export default Text;