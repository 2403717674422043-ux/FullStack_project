const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBookingById, updateBookingStatus, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMyBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBookingStatus)
  .delete(protect, deleteBooking);

module.exports = router;
