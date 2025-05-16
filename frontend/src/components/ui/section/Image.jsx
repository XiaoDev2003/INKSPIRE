import React from 'react';

const Image = ({ src, alt, ratio = '16/9', className = '' }) => {
  const ratios = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    square: 'aspect-square',
    full: 'w-full h-full',
  };

  return (
    <div className={`relative overflow-hidden ${ratios[ratio]}`}>
      <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
    </div>
  );
};

export default Image;