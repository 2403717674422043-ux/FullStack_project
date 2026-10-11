import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    return await api.post('/bookings', bookingData);
  },

  getMyBookings: async () => {
    return await api.get('/bookings');
  },

  getBookingById: async (id) => {
    return await api.get(`/bookings/${id}`);
  },

  updateBookingStatus: async (id, statusData) => {
    return await api.put(`/bookings/${id}`, statusData);
  },

  deleteBooking: async (id) => {
    return await api.delete(`/bookings/${id}`);
  }
};
