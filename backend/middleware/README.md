# Hệ thống Xác thực và Phân quyền

## Tổng quan
Hệ thống xác thực và phân quyền của Inkspire cho phép:
- Đăng nhập bằng tài khoản từ cơ sở dữ liệu
- Phân quyền truy cập dựa trên vai trò (role) của người dùng
- Bảo vệ các route cần xác thực
- Cấp quyền đặc biệt cho tài khoản có role admin

## Cấu trúc

### Middleware
- **AuthMiddleware**: Kiểm tra trạng thái đăng nhập của người dùng
- **AdminMiddleware**: Kiểm tra quyền admin của người dùng

### Model
- **Auth**: Xử lý xác thực người dùng, kiểm tra quyền admin

### Controller
- **AuthController**: Xử lý đăng ký, đăng nhập, đăng xuất và lấy thông tin người dùng hiện tại

## Cách sử dụng

### Đăng nhập
```
POST /api/login
Body: {
  "email": "example@email.com",
  "password": "password123"
}
```

### Đăng xuất
```
POST /api/logout
```

### Lấy thông tin người dùng hiện tại
```
GET /api/user
```

### Truy cập route admin
```
GET /api/admin/users
GET /api/admin/categories
```

## Bảo mật
- Sử dụng session PHP để lưu trữ thông tin đăng nhập
- Mật khẩu được mã hóa bằng password_hash() và password_verify()
- Middleware kiểm tra quyền truy cập trước khi cho phép truy cập vào các route được bảo vệ

## Lưu ý
- Đảm bảo session_start() được gọi trước khi sử dụng session
- Không lưu trữ mật khẩu dưới dạng plain text
- Luôn kiểm tra quyền truy cập trước khi cho phép truy cập vào các route được bảo vệ