/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

// Section component: Bao ngoài phần nội dung
const Section = ({
  as: Element = 'div',
  className = '',
  children,
  shadow = false,
  py = '',
  px = '',
}) => {
  const paddingY = py ? `py-${py}` : '';
  const paddingX = px ? `px-${px}` : '';

  const finalClassName = clsx(
    className,
    {
      'shadow-md': Boolean(shadow),
      [paddingY]: paddingY,
      [paddingX]: paddingX,
    }
  );

  return (
    <Element className={finalClassName}>
      {children}
    </Element>
  );
};

export default Section;