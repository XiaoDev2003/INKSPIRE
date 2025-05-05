// src/components/layout/client/gallery/GalleryMasonry.jsx
import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

const GalleryMasonry = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => openModal(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-medium">{image.alt}</h3>
              <p className="text-gray-200 text-sm mt-1 line-clamp-2">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <GalleryModal image={selectedImage} onClose={closeModal} />
      )}
    </>
  );
};

export default GalleryMasonry;