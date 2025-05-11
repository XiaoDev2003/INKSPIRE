// 📁 src/api/axiosClient.js
import axios from 'axios';

// Hàm để xác định baseURL dựa trên môi trường
const getBaseUrl = () => {
  // Lấy hostname hiện tại (localhost, 127.0.0.1, hoặc IP/domain khác)
  const hostname = window.location.hostname;
  
  // Nếu đang ở môi trường phát triển (localhost)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Sử dụng đường dẫn tương đối đến backend
    return '/INKSPIRE/backend';
  }
  
  // Nếu đang ở môi trường production
  return '/INKSPIRE/backend';
};

// 👉 Tạo một client axios có sẵn baseURL và headers
const axiosClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  // Thêm withCredentials để gửi cookies trong các yêu cầu cross-origin
  withCredentials: true
});

// Thêm interceptor để xử lý lỗi
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi kết nối
    if (!error.response) {
      console.error('Lỗi kết nối đến server:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;