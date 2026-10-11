const Booking = require('../models/Booking');
const Space = require('../models/Space');

// Helper to check time overlap (HH:MM strings)
const checkTimeOverlap = (startA, endA, startB, endB) => {
  return startA < endB && endA > startB;
};

// @desc    Create a space booking request
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { spaceId, requestedDate, startTime, endTime, purpose, expectedParticipants, activityId } = req.body;

    if (!spaceId || !requestedDate || !startTime || !endTime || !purpose || !expectedParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Please provide spaceId, requestedDate, startTime, endTime, purpose, and expectedParticipants'
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: 'Start time must be strictly before end time'
      });
    }

    // Verify space exists
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ success: false, message: 'Space not found' });
    }

    if (!space.isAvailable) {
      return res.status(400).json({ success: false, message: 'This space is currently marked as unavailable' });
    }

    if (Number(expectedParticipants) > space.capacity) {
      return res.status(400).json({
        success: false,
        message: `Expected participants (${expectedParticipants}) exceeds space capacity (${space.capacity})`
      });
    }

    // Check conflict with APPROVED bookings on the same date
    const targetDate = new Date(requestedDate);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const existingApprovedBookings = await Booking.find({
      space: spaceId,
      status: 'approved',
      requestedDate: { $gte: startOfDay, $lte: endOfDay }
    });

    for (let existing of existingApprovedBookings) {
      if (checkTimeOverlap(startTime, endTime, existing.startTime, existing.endTime)) {
        return res.status(400).json({
          success: false,
          message: `Time conflict! Space is already approved for a booking on this date between ${existing.startTime} and ${existing.endTime}.`
        });
      }
    }

    const booking = await Booking.create({
      user: req.user._id,
      space: spaceId,
      activity: activityId || undefined,
      requestedDate: new Date(requestedDate),
      startTime,
      endTime,
      purpose,
      expectedParticipants: Number(expectedParticipants),
      status: 'pending'
    });

    const populatedBooking = await Booking.findById(booking._id).populate('space').populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('space')
      .populate('activity')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('space')
      .populate('user', 'name email avatar phone')
      .populate('activity');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check ownership or admin
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Approve / Reject / Cancel)
// @route   PUT /api/bookings/:id
// @access  Private (Admin for approve/reject, User for cancel)
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    let booking = await Booking.findById(req.params.id).populate('space');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // User can cancel their own pending booking
    if (status === 'cancelled') {
      if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
      }
      booking.status = 'cancelled';
      await booking.save();
      return res.json({ success: true, data: booking });
    }

    // Admin approval/rejection logic
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only administrators can approve or reject bookings' });
    }

    if (status === 'approved') {
      // Perform conflict check before approving
      const targetDate = new Date(booking.requestedDate);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      const existingApprovedBookings = await Booking.find({
        _id: { $ne: booking._id },
        space: booking.space._id,
        status: 'approved',
        requestedDate: { $gte: startOfDay, $lte: endOfDay }
      });

      for (let existing of existingApprovedBookings) {
        if (checkTimeOverlap(booking.startTime, booking.endTime, existing.startTime, existing.endTime)) {
          return res.status(400).json({
            success: false,
            message: `Cannot approve! Conflicting approved booking exists between ${existing.startTime} and ${existing.endTime}.`
          });
        }
      }
    }

    if (status) booking.status = status;
    if (adminNotes !== undefined) booking.adminNotes = adminNotes;

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('space')
      .populate('user', 'name email');

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this booking' });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
};
