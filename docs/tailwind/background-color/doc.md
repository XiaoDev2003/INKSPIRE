
Dưới đây là **bảng tổng hợp đầy đủ màu nền (`background-color`) trong Tailwind CSS**, bao gồm:

- Các lớp đặc biệt như: `bg-inherit`, `bg-current`, `bg-transparent`, `bg-black`, `bg-white`
- Tất cả các nhóm màu chính với đầy đủ sắc độ từ `50` đến `950`: đỏ, cam, vàng, xanh lá, xanh dương...
- Màu tùy chỉnh theo cú pháp mới: `bg-[...]`, `bg-(...)`

---

## 🎨 **BẢNG MÀU ĐẦY ĐỦ TRONG TAILWIND CSS**

| **Loại Màu**                    | **Mã Tailwind**                                               | **Ghi chú / Phối màu đẹp**         |
| --------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------- |
| Kế thừa                               | `bg-inherit`                                                       | Kế thừa từ phần tử cha                   |
| Theo màu chữ                          | `bg-current`                                                       | Dùng giá trị `color` hiện tại          |
| Trong suốt                             | `bg-transparent`                                                   | Không có màu nền                          |
| Đen cơ bản                           | `bg-black`                                                         | #000 – phối với trắng, vàng neon         |
| Trắng cơ bản                         | `bg-white`                                                         | #fff – phối với đen, xanh dương         |
| **Đỏ (Red)**                    | `bg-red-50 → bg-red-950`                                          | Phối với trắng, đen, xanh lá             |
| **Cam (Orange)**                  | `bg-orange-50 → bg-orange-950`                                    | Xanh dương nhạt, trắng                    |
| **Hổ Phách (Amber)**            | `bg-amber-50 → bg-amber-950`                                      | Nâu, be, trắng                              |
| **Vàng (Yellow)**                | `bg-yellow-50 → bg-yellow-950`                                    | Đen, trắng, xanh dương                    |
| **Xanh Chanh (Lime)**             | `bg-lime-50 → bg-lime-950`                                        | Hồng, tím, trắng                           |
| **Xanh Lá (Green)**              | `bg-green-50 → bg-green-950`                                      | Be, vàng, trắng                             |
| **Ngọc Lục Bảo (Emerald)**     | `bg-emerald-50 → bg-emerald-950`                                  | Hồng pastel, trắng                          |
| **Xanh Lơ (Teal)**               | `bg-teal-50 → bg-teal-950`                                        | Hồng phấn, trắng, be                       |
| **Xanh Dương Nhạt (Cyan/Sky)** | `bg-cyan-50 → bg-cyan-950`, `bg-sky-50 → bg-sky-950`           | Hồng, cam, trắng                            |
| **Xanh Dương (Blue)**           | `bg-blue-50 → bg-blue-950`                                        | Cam, vàng, trắng                            |
| **Chàm (Indigo)**                | `bg-indigo-50 → bg-indigo-950`                                    | Hồng, tím, trắng                           |
| **Tím (Violet/Purple)**          | `bg-violet-50 → bg-violet-950`, `bg-purple-50 → bg-purple-950` | Hồng, be, xanh lơ                           |
| **Tử Đinh Hương (Fuchsia)**   | `bg-fuchsia-50 → bg-fuchsia-950`                                  | Hồng, trắng, đen                           |
| **Hồng (Pink/Rose)**             | `bg-pink-50 → bg-pink-950`, `bg-rose-50 → bg-rose-950`         | Xanh lơ, trắng, xám                        |
| **Xám Xanh (Slate)**             | `bg-slate-50 → bg-slate-950`                                      | Trắng, xanh dương, vàng đồng            |
| **Xám (Gray)**                   | `bg-gray-50 → bg-gray-950`                                        | Phối được với hầu hết màu trung tính |
| **Kẽm (Zinc)**                   | `bg-zinc-50 → bg-zinc-950`                                        | Xanh dương, hồng, trắng                   |
| **Trung Tính (Neutral)**         | `bg-neutral-50 → bg-neutral-950`                                  | Làm nền sạch sẽ, dễ phối màu           |
| **Đất Sét (Stone)**            | `bg-stone-50 → bg-stone-950`                                      | Nâu, be, xám                                |

---

### 💡 **Màu Tùy Chỉnh (Custom Colors)**

Tailwind hỗ trợ thêm bất kỳ màu nào bằng cách dùng cú pháp sau:

| **Loại Tùy Chỉnh** | **Cú pháp Tailwind** | **Ví dụ sử dụng**                                            |
| --------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| Hex Color                   | `bg-[#ff5e5e]`             | `<div class="bg-[#ff5e5e]">Màu đỏ tùy chỉnh</div>`              |
| RGBA                        | `bg-[rgba(255,0,0,0.5)]`   | `<div class="bg-[rgba(255,0,0,0.5)]">Nửa trong suốt</div>`         |
| HSL                         | `bg-[hsl(120,100%,50%)]`   | `<div class="bg-[hsl(120,100%,50%)">Xanh lá tùy biến</div>`       |
| Biến CSS tùy ý           | `bg-(--my-color)`          | Định nghĩa trong CSS:`--my-color: #ff0000;` rồi dùng trong HTML |

---

### ✅ **Gợi Ý Phối Màu Đẹp Trong Thiết Kế UI**

| **Phong Cách**         | **Màu Kết Hợp**                              | **Ứng dụng**                |
| ----------------------------- | ----------------------------------------------------- | ----------------------------------- |
| Hiện đại & chuyên nghiệp | `bg-blue-600` + `bg-white` + `bg-gray-200`      | Giao diện quản trị, landing page |
| Năng động & trẻ trung     | `bg-orange-500` + `bg-cyan-400` + `bg-white`    | Website bán hàng, app học tập   |
| Thiên nhiên & thư giãn    | `bg-green-500` + `bg-amber-300` + `bg-white`    | App sức khỏe, nông nghiệp       |
| Sang trọng & đẳng cấp     | `bg-purple-700` + `bg-pink-300` + `bg-gray-900` | App thời trang, mỹ phẩm          |
| Pastel dịu mắt              | `bg-pink-200` + `bg-emerald-200` + `bg-white`   | Website cá nhân, portfolio        |
| Minimal / tối giản          | `bg-gray-100` + `bg-black` + `bg-white`         | Landing page, form nhập liệu      |

---

📌 **Lưu ý:**

- Tailwind CSS phiên bản mới sử dụng hệ màu `oklch(...)` để đảm bảo sự cân bằng và cảm nhận tự nhiên về màu sắc.
- Mỗi nhóm màu có **12 mức độ** từ `50` đến `950`.

---

Nếu bạn muốn mình xuất bảng này dưới dạng file Excel hoặc PDF để lưu trữ, chỉ cần nói:
👉 **"Xuất Excel"** hoặc **"Xuất PDF"**

Bạn cũng có thể hỏi riêng về từng nhóm màu nếu cần ví dụ cụ thể nhé!
