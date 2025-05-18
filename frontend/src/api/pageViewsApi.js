// src/api/pageViewsApi.js
import axiosClient from './axiosClient';

const pageViewsApi = {
  // Lấy thông tin lượt truy cập
  getPageViews: () => {
    return axiosClient.get('/api/page-views/get');
  },

  // Tăng số lượt truy cập
  incrementPageViews: () => {
    return axiosClient.get('/api/page-views/increment');
  },

  // Admin API
  // Lấy tất cả các bộ đếm
  getAllCounters: () => {
    return axiosClient.get('/api/admin/page-views/all');
  },

  // Lấy thông tin bộ đếm theo ID
  getCounterById: (id) => {
    return axiosClient.get(`/api/admin/page-views/get?id=${id}`);
  },

  // Tạo bộ đếm mới
  createCounter: (data) => {
    return axiosClient.post('/api/admin/page-views/create', data);
  },

  // Cập nhật bộ đếm
  updateCounter: (id, data) => {
    return axiosClient.post(`/api/admin/page-views/update?id=${id}`, data);
  },

  // Xóa bộ đếm
  deleteCounter: (id) => {
    return axiosClient.get(`/api/admin/page-views/delete?id=${id}`);
  },
};

export default pageViewsApi;