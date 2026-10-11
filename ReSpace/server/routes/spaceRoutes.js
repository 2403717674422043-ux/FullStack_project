const express = require('express');
const router = express.Router();
const { getSpaces, getSpaceById, createSpace, updateSpace, deleteSpace } = require('../controllers/spaceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSpaces)
  .post(protect, createSpace);

router.route('/:id')
  .get(getSpaceById)
  .put(protect, updateSpace)
  .delete(protect, deleteSpace);

module.exports = router;
