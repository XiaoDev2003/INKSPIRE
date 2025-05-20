// src/components/layout/client/calligraphy/CalligraphyCategory.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Text } from "../../../../components/ui/ui";

const CalligraphyCategory = () => {
  // TODO: Thay thế dữ liệu tĩnh bằng dữ liệu lấy từ API nếu có, chuẩn hóa dữ liệu trả về
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Giả lập gọi API, thay thế bằng fetch thực tế nếu có endpoint
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        // Giả lập dữ liệu, thay bằng API thực tế
        const data = [
          {
            id: 1,
            title: "Thư pháp truyền thống",
            description:
              "Nghệ thuật viết chữ truyền thống với bút lông và mực Tàu, thể hiện vẻ đẹp của văn hóa Á Đông.",
            imageSrc: "/banner/traditional.png",
            link: "/category/traditional",
          },
          {
            id: 2,
            title: "Thư pháp hiện đại",
            description:
              "Kết hợp giữa kỹ thuật truyền thống và phong cách đương đại, tạo nên những tác phẩm độc đáo và sáng tạo.",
            imageSrc: "/banner/modern.png",
            link: "/category/modern",
          },
          {
            id: 3,
            title: "Viết tay thiết kế",
            description:
              "Nghệ thuật viết tay kết hợp với thiết kế hiện đại, tạo nên những tác phẩm độc đáo và cá nhân hóa.",
            imageSrc: "/banner/design.png",
            link: "/category/handwriting",
          },
        ];
        // Chuẩn hóa dữ liệu nếu cần
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Không thể tải danh mục. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-amber-700">Đang tải danh mục...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (!categories || categories.length === 0) {
    return <div className="text-center py-10 text-gray-500">Không có danh mục nào để hiển thị.</div>;
  }

  return (
    <>
      <Text
        as="h2"
        size="3xl"
        weight="bold"
        color="text-amber-900"
        className="mb-10"
        isHeading={true}
        line={true}
      >
        Các danh mục thư pháp
      </Text>
      <Text as="p" size="base" color="text-gray-600" className="mb-12">
        Khám phá các phong cách thư pháp đa dạng từ truyền thống đến hiện đại,
        mỗi phong cách đều mang đến những nét đẹp và ý nghĩa riêng biệt.
      </Text>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id || category.title}
            className="overflow-hidden rounded-lg bg-gray-50 shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={category.imageSrc || "/banner/fallback.png"}
                alt={category.title || "Danh mục thư pháp"}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                onError={e => { e.target.src = "/banner/fallback.png"; }}
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-amber-800">
                {category.title || "Không rõ tên"}
              </h3>
              <p className="mb-4 text-gray-600">{category.description || "Không có mô tả."}</p>
              <Link
                to={category.link || "#"}
                className="inline-block rounded-md bg-amber-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-600"
              >
                Xem danh mục
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CalligraphyCategory;