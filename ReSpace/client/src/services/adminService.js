import api from './api';

export const adminService = {
  getStats: async () => {
    return await api.get('/admin/stats');
  },

  getUsers: async () => {
    return await api.get('/admin/users');
  },

  updateUserRole: async (id, role) => {
    return await api.put(`/admin/users/${id}/role`, { role });
  },

  deleteUser: async (id) => {
    return await api.delete(`/admin/users/${id}`);
  },

  getAllBookings: async (params = {}) => {
    return await api.get('/admin/bookings', { params });
  }
};
