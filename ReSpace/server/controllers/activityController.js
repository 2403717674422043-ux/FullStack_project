const Activity = require('../models/Activity');
const Space = require('../models/Space');

// @desc    Get all activities with search & filter
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res, next) => {
  try {
    const { search, category, spaceId, status } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (spaceId) {
      query.space = spaceId;
    }

    if (status) {
      query.status = status;
    }

    const activities = await Activity.find(query)
      .populate('organizer', 'name email avatar organization')
      .populate('space', 'name location capacity image')
      .populate('participants', 'name email avatar')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single activity by ID
// @route   GET /api/activities/:id
// @access  Public
const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('organizer', 'name email avatar bio phone organization')
      .populate('space')
      .populate('participants', 'name email avatar');

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private
const createActivity = async (req, res, next) => {
  try {
    const { title, description, category, spaceId, date, startTime, endTime, expectedParticipants, image } = req.body;

    if (!title || !description || !category || !spaceId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, category, spaceId, date, startTime, and endTime'
      });
    }

    // Verify space
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ success: false, message: 'Selected space not found' });
    }

    const activity = await Activity.create({
      title,
      description,
      category,
      organizer: req.user._id,
      space: spaceId,
      date: new Date(date),
      startTime,
      endTime,
      expectedParticipants: expectedParticipants || 20,
      participants: [req.user._id],
      image: image || space.image
    });

    const populatedActivity = await Activity.findById(activity._id)
      .populate('organizer', 'name email avatar')
      .populate('space', 'name location capacity');

    res.status(201).json({
      success: true,
      data: populatedActivity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private (Organizer or Admin)
const updateActivity = async (req, res, next) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    if (activity.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this activity' });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('organizer', 'name email avatar').populate('space');

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private (Organizer or Admin)
const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    if (activity.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this activity' });
    }

    await activity.deleteOne();

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Join an activity
// @route   POST /api/activities/:id/join
// @access  Private
const joinActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const alreadyJoined = activity.participants.some(
      p => p.toString() === req.user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: 'You have already joined this activity' });
    }

    activity.participants.push(req.user._id);
    await activity.save();

    const updatedActivity = await Activity.findById(activity._id)
      .populate('organizer', 'name email avatar')
      .populate('participants', 'name email avatar');

    res.json({
      success: true,
      data: updatedActivity,
      message: 'Successfully joined activity!'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Leave an activity
// @route   POST /api/activities/:id/leave
// @access  Private
const leaveActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    activity.participants = activity.participants.filter(
      p => p.toString() !== req.user._id.toString()
    );

    await activity.save();

    const updatedActivity = await Activity.findById(activity._id)
      .populate('organizer', 'name email avatar')
      .populate('participants', 'name email avatar');

    res.json({
      success: true,
      data: updatedActivity,
      message: 'Left activity successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  joinActivity,
  leaveActivity
};
