// src/components/AccordionItem.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "../../ui/ui";

const AccordionItem = ({ title, imageSrc, content, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Dòng đầu: Ảnh + Tiêu đề + Nút toggle */}
      <div className="mb-4 flex items-center">
        {/* Hình tròn chứa ảnh */}
        <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
          <Link to={link}>
            <Image
              src={imageSrc}
              alt={title}
              ratio="square"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>

        {/* Tiêu đề */}
        <div className="flex-grow">
          <Link
            to={link}
            className="cursor-pointer text-lg font-bold text-black transition-colors hover:text-gray-600"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
          >
            {title}
          </Link>
        </div>

        {/* Dùng Button thay vì button nguyên bản */}
        <Button
          variant="secondary"
          size="sm"
          isRound
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Ẩn" : "Hiện"}
        </Button>
      </div>

      {/* Nội dung accordion */}
      {isOpen && (
        <div className="bg-opacity-60 mt-2 rounded-md border border-gray-200 bg-gray-100 p-4 backdrop-blur-sm">
          <p className="text-gray-700">{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;