const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  updateUserRole,
  deleteUser,
  getAllBookings
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect all admin routes
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/bookings', getAllBookings);

module.exports = router;
