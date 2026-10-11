const express = require('express');
const router = express.Router();
const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  joinActivity,
  leaveActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getActivities)
  .post(protect, createActivity);

router.route('/:id')
  .get(getActivityById)
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

router.post('/:id/join', protect, joinActivity);
router.post('/:id/leave', protect, leaveActivity);

module.exports = router;
