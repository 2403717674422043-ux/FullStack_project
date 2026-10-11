import api from './api';

export const activityService = {
  getActivities: async (params = {}) => {
    return await api.get('/activities', { params });
  },

  getActivityById: async (id) => {
    return await api.get(`/activities/${id}`);
  },

  createActivity: async (activityData) => {
    return await api.post('/activities', activityData);
  },

  updateActivity: async (id, activityData) => {
    return await api.put(`/activities/${id}`, activityData);
  },

  deleteActivity: async (id) => {
    return await api.delete(`/activities/${id}`);
  },

  joinActivity: async (id) => {
    return await api.post(`/activities/${id}/join`);
  },

  leaveActivity: async (id) => {
    return await api.post(`/activities/${id}/leave`);
  }
};
