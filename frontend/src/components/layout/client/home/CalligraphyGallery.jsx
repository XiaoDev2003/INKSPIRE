// src/components/layout/client/calligraphy/CalligraphyGallery.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/ui/ui';

const galleryItems = [
  {
    id: 1,
    title: "Chữ Phúc",
    artist: "Nguyễn Văn Minh",
    image: "./pages/home/phuc.png",
    category: "Thư pháp truyền thống"
  },
  {
    id: 2,
    title: "Tĩnh Tâm",
    artist: "Trần Thị Hương",
    image: "./pages/home/tinhtam.png",
    category: "Thư pháp hiện đại"
  },
  {
    id: 3,
    title: "An Nhiên",
    artist: "Lê Văn Thành",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1770&auto=format&fit=crop",
    category: "Thư pháp kết hợp hội họa"
  },
  {
    id: 4,
    title: "Thanh Tịnh",
    artist: "Phạm Minh Tuấn",
    image: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1974&auto=format&fit=crop",
    category: "Thư pháp truyền thống"
  },
  {
    id: 5,
    title: "Vô Ưu",
    artist: "Hoàng Thị Mai",
    image: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?q=80&w=1974&auto=format&fit=crop",
    category: "Thư pháp hiện đại"
  },
  {
    id: 6,
    title: "Trí Tuệ",
    artist: "Đỗ Quang Hải",
    image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1770&auto=format&fit=crop",
    category: "Thư pháp kết hợp hội họa"
  }
];

const GalleryItem = ({ item, onClick }) => {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
      onClick={() => onClick(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg">{item.title}</h3>
        <p className="text-gray-200 text-sm">{item.artist}</p>
        <span className="text-amber-300 text-xs mt-1">{item.category}</span>
      </div>
    </div>
  );
};

const CalligraphyGallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi modal mở
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Cho phép cuộn trang khi modal đóng
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <Text
            as="h2"
            size="3xl"
            weight="bold"
            color="text-gray-800"
            className="text-center mb-2"
            isHeading={true}
            line={true}
          >
            Bộ sưu tập tác phẩm
          </Text>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những tác phẩm thư pháp đẹp mắt từ các nghệ nhân tài năng trong cộng đồng của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map(item => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={openModal}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-md transition-colors duration-300"
          >
            Xem tất cả tác phẩm
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal hiển thị chi tiết tác phẩm */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-1">Nghệ nhân: {selectedItem.artist}</p>
              <p className="text-amber-600 text-sm mb-4">Thể loại: {selectedItem.category}</p>

              <p className="text-gray-700 mb-4">
                Tác phẩm thư pháp này thể hiện sự kết hợp hài hòa giữa nét bút truyền thống và cảm xúc hiện đại.
                Mỗi nét chữ đều được thể hiện với sự tỉ mỉ và tâm huyết của nghệ nhân.
              </p>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CalligraphyGallery;