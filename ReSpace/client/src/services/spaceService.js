import api from './api';

export const spaceService = {
  getSpaces: async (params = {}) => {
    return await api.get('/spaces', { params });
  },

  getSpaceById: async (id) => {
    return await api.get(`/spaces/${id}`);
  },

  createSpace: async (spaceData) => {
    return await api.post('/spaces', spaceData);
  },

  updateSpace: async (id, spaceData) => {
    return await api.put(`/spaces/${id}`, spaceData);
  },

  deleteSpace: async (id) => {
    return await api.delete(`/spaces/${id}`);
  }
};
