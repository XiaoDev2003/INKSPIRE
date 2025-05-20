// src/components/layout/client/gallery/GalleryFilter.jsx
import React, { memo, useCallback } from "react";

// Tạo component con để tối ưu hóa việc render lại
const FilterButton = memo(({ id, name, isActive, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        isActive ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
});

const GalleryFilter = memo(({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Bộ lọc tác phẩm</h3>
      <div className="flex flex-wrap gap-2">
        <FilterButton
          id="all"
          name="Tất cả"
          isActive={activeCategory === "all"}
          onClick={onCategoryChange}
        />
        {Array.isArray(categories) && categories.map((category) => (
          <FilterButton
            key={category.id}
            id={category.id}
            name={category.name}
            isActive={activeCategory === category.id}
            onClick={onCategoryChange}
          />
        ))}
      </div>
    </div>
  );
});

export default GalleryFilter;