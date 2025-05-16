/* eslint-disable no-unused-vars */
import React from 'react'

// Box component: Thay thế thẻ div linh hoạt
const Box = ({
  as: Element = 'div',
  className = '',
  children,
  shadow = 'false'
}) => {
  // Kiểm tra nếu shadow là 'true' (string) hoặc true (boolean)
  const shouldAddShadow = shadow === 'true' || shadow === true;

  // Thêm shadow-md nếu điều kiện đúng
  const finalClassName = shouldAddShadow
    ? `${className} shadow-md`
    : className;

  return (
    <Element className={finalClassName}>
      {children}
    </Element>
  );
};


export default Box