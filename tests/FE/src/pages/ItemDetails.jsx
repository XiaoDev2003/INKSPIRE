// 📁 src/pages/ItemDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axiosClient.get(`/api/items?item_id=${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.error('Item detail error:', err));
  }, [id]);

  if (!item) return <p className="p-4">Đang tải thông tin font...</p>;

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{item.item_name} – {item.item_description}</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <img
            src={`/images/gallery/${item.image_url || 'no-image.jpg'}`}
            alt={item.item_name}
            className="w-full object-cover rounded shadow"
          />
        </div>
        <div className="flex-1 space-y-2 text-sm text-gray-700">
          <p><strong>Tác giả:</strong> {item.author_name || 'Chưa cập nhật'}</p>
          <p><strong>Người đăng:</strong> {item.uploaded_by_name || 'Không rõ'}</p>
          <p><strong>Việt hóa:</strong> {item.script_type}</p>
          <p><strong>Ngày đăng:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
          <p><strong>Số lượt tải:</strong> {item.downloads || 0}</p>

          <div className="flex gap-2 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">TẢI FONT NGAY</button>
            <button className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300">Chia sẻ</button>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-lg font-semibold mb-2">Giới thiệu chi tiết</h2>
        <p>
          {item.item_description || 'Font này mang phong cách hiện đại, phù hợp với các thiết kế trang nhã và sáng tạo.'}
        </p>
        <p className="text-sm text-red-600 mt-4">
          <strong>Lưu ý:</strong> Font này chỉ sử dụng cho mục đích cá nhân. Nếu sử dụng cho mục đích thương mại, vui lòng liên hệ tác giả để mua bản quyền.
        </p>
      </div>
    </section>
  );
}
