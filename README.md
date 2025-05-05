# INKSPIRE - Website về thư pháp

---

## Giới thiệu

## Cấu trúc thư mục

1. **Frontend**

   * **/ public** : `Chứa tài nguyên tĩnh không cần qua xử lý`
     * **/ font** : `tài nguyên font chữ`
     * favicon16.jpg : `chứa icon của website kích cỡ 16px - 16px`
     * logo.png : `logo cho website`
   * **/** **src** : `Chứa mã nguồn trực tiếp xây dựng lên giao diện ứng dụng `
     * **/** **component** : `chứa các thành phần giao diện`
       * **/ common** : `chứa các thành phần sử dụng phổ biến có thể gọi lại ở nhiều nơi`
         * Button.jsx : `Nút nhấn chung với nhiều biến thể`
       * **/ layout **
         * Header.jsx
         * Main.jsx
         * Navbar.jsx
         * Footer.jsx
     * **/ config**
       * tailwind.css  : `import css của tailwind`
     * App.jsx
     * main.jsx
     * routes.jsx
   * index.html : `Là file gốc của website , trình duyệt sẽ sử dụng file này để hiển thị website`
   * **/ node_modules** : `Chứa tất cả các thư viện phụ thuộc , thư viện chính được cấu hình ở package.json`
   * .gitignore : `Liệt kê các thư mục / file mà git sẽ bỏ qua khi commit`
   * .prettierc : `Cấu hình định dạng code cho dự án`
   * eslint.config.js : `Cấu hình eslint - công cụ kiểm tra lỗi cú pháp js/jsx`
   * package.json : `Mô tả các thành phần phụ thuộc và công cụ phát triển của dự án`
   * package-lock.json : `Ghi lại phiên bản chính xác của từng phụ thuộc`
   * tailwind.config.js : `Cấu hình tailwind.css`
   * vite.config.js : `Cấu hình vite - công cụ build frontend hiện đại  `
2. **Backend**
3. **SQL**
4. **Tests**
5. **Docs**

## Chức năng tổng quan

## Liên kết mục
