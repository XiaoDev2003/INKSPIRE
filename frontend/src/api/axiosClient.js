// 📁 src/api/axiosClient.js
import axios from 'axios';

// 👉 Tạo một client axios có sẵn baseURL và headers
const axiosClient = axios.create({
  baseURL: 'http://localhost/backend',
  // baseURL: 'http://localhost/Workspace/Project/Inkspire/backend/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cho phép gửi cookies với mỗi request
});

export default axiosClient;