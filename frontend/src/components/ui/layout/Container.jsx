/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

// Container component: Giới hạn chiều rộng + padding động
const Container = ({
  as: Element = 'div',
  className = '',
  children,
  py = '',
  px = '',
}) => {
  const paddingY = py ? `py-${py}` : '';
  const paddingX = px ? `px-${px}` : '';

  const containerClass = clsx(
    'mx-auto w-full',
    {
      [paddingY]: paddingY,
      [paddingX]: paddingX,
    },
    className
  );

  return (
    <Element className={containerClass}>
      {children}
    </Element>
  );
};

export default Container;