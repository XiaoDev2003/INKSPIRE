// 📁 src/api/axiosClient.js
import axios from 'axios';

// 👉 Tạo một client axios có sẵn baseURL và headers
const axiosClient = axios.create({
  baseURL: 'http://localhost/EP1/backend',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;