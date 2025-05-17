# React Router

---

## Giới thiệu

| .                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React Router** là một thư viện điều hướng cho ứng dụng React , giúp bạn quản lý các URL khác nhau<br />và điều hướng người dùng giữa các trang `Components` mà không cần phải tải lại trang |

### Hướng dẫn cài đặt

**Bước 1** : Truy cập vào ứng dụng  react

**Bước 2** : Mở terminal ở trong vs code ngay tại thư mục này

**Bước 3** : Cài đặt thư viện với câu lệnh sau

```bash
npm install react-router-dom
```

**Bước 4** : Truy cập vào file `main.jsx` cấu hình như sau

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './config/tailwind.css'; // Cấu hình tailwind nếu có

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Định nghĩa đường dẫn

```javascript
<Routes>
      <Route path="/" element={<Component/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
</Routes>
```

## Kiến thức cơ bản

### Sử dụng link thay thế thẻ a

> Dùng để điều hướng các routes mà không cần phải tải lại trang
