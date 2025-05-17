# Các nguyên nhân phổ biến gây lỗi "Không thể kết nối đến server" khi đăng ký tài khoản từ frontend

1. **Sai URL API hoặc cấu hình endpoint**
   - Frontend gọi sai địa chỉ hoặc port của backend (ví dụ: gọi localhost:3000 thay vì localhost:8000).
   - Đường dẫn API trong axios hoặc fetch không đúng với backend thực tế.

2. **CORS (Cross-Origin Resource Sharing) chưa cấu hình đúng**
   - Backend chưa bật hoặc cấu hình CORS chưa cho phép domain của frontend truy cập.
   - Trình duyệt sẽ chặn request nếu CORS không cho phép.

3. **Backend chưa chạy hoặc chạy sai port**
   - Backend chưa được start hoặc bị crash.
   - Backend chạy trên port khác với port frontend đang gọi.

4. **Backend không cho phép phương thức POST hoặc route /api/register chưa tồn tại**
   - API backend chưa khai báo route POST /api/register.
   - Chỉ cho phép GET hoặc chưa mở POST cho endpoint này.

5. **Frontend và backend không cùng origin hoặc không cùng network**
   - Frontend gọi đến backend qua localhost nhưng truy cập từ máy khác hoặc qua IP khác.
   - Backend chỉ listen 127.0.0.1 thay vì 0.0.0.0 nên không nhận request từ ngoài.

6. **Lỗi bảo mật trình duyệt hoặc chặn bởi firewall/antivirus**
   - Trình duyệt chặn request do mixed content (http/https).
   - Firewall hoặc phần mềm bảo mật chặn kết nối đến backend.

7. **Lỗi proxy hoặc cấu hình reverse proxy sai**
   - Nếu dùng nginx/apache proxy, cấu hình proxy_pass hoặc rewrite chưa đúng.

## Cách kiểm tra
- Kiểm tra log của backend khi gửi request đăng ký.
- Dùng DevTools (tab Network) để xem request có gửi đi không, lỗi gì trả về.
- Kiểm tra lại URL, port, CORS, và trạng thái backend.
- Thử gọi API bằng Postman/cURL để xác nhận backend hoạt động.

> Ghi chú: Nếu truy cập backend trực tiếp trên trình duyệt được nhưng đăng ký từ frontend báo lỗi, khả năng cao là do CORS hoặc sai endpoint.