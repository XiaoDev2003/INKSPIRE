import React from 'react';

// Box component: Thay thế thẻ div linh hoạt
const Box = ({
  as: Tag = 'div',
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
    <Tag className={finalClassName}>
      {children}
    </Tag>
  );
};
// Container component: Giới hạn chiều rộng
const Container = ({
  className = '',
  children,
  size = 'responsive',       // Kích thước mặc định
  as: Tag = 'div',   // Có thể truyền vào 'section', 'main', v.v.
}) => {
  const sizes = {
    // Các kích thước màn hình tối đa ( responsive )
    xsmall: 'max-w-xs',      // 20rem / 320px
    small: 'max-w-sm',      // 24rem / 384px
    medium: 'max-w-md',      // 28rem / 448px
    larger: 'max-w-lg',      // 32rem / 512px
    xlarger: 'max-w-xl',      // 36rem / 576px

    // Các giá trị đặc biệt
    none: 'max-w-none',     // max-width: none  / Vô hiệu hoá chiều rộng tối đa nếu có kế thừa
    full: 'max-w-full',     // max-width: 100% / Chiếm toàn bộ chiều rộng của phần tử cha
    min: 'max-w-min',       // max-width: min-content / Chiều rộng tối thiểu vừa đủ để chứa nội dung
    max: 'max-w-max',       // max-width: max-content / 	Chiều rộng tối đa phù hợp với nội dung
    fit: 'max-w-fit',       // max-width: fit-content / 	Co giãn theo nội dung nhưng không vượt quá khối chứa
    screen: 'max-w-screen', // max-width: 100vw / Tối đa bằng chiều rộng viewport (màn hình)
    dvw: 'max-w-dvw',       // max-width: 100dvw / Chiều rộng viewport động (dynamic viewport width)
    dvh: 'max-w-dvh',       // max-width: 100dvh / Chiều cao viewport động
    lvw: 'max-w-lvw',       // max-width: 100lvw / Chiều rộng viewport lớn nhất (large viewport width)
    lvh: 'max-w-lvh',       // max-width: 100lvh / 	Chiều cao viewport lớn nhất
    svw: 'max-w-svw',       // max-width: 100svw / 	Chiều rộng viewport nhỏ nhất (small viewport width)
    svh: 'max-w-svh',       // max-width: 100svh / Chiều cao viewport nhỏ nhất

    // Responsive container theo tailwind
    banner: 'container', // width: 100%, @media max-width tương ứng
  };

  return (
    <Tag className={`mx-auto ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
};


const Section = ({
  children,
  py = 'py-12'
}) => {
  return (
    <section className={`w-full ${py}`}>
      {children}
    </section>
  );
};

// Xuất các component
export { Box, Container, Section };
