const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      required: true
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    requestedDate: {
      type: Date,
      required: [true, 'Please select a requested date']
    },
    startTime: {
      type: String,
      required: [true, 'Please specify start time (HH:MM)']
    },
    endTime: {
      type: String,
      required: [true, 'Please specify end time (HH:MM)']
    },
    purpose: {
      type: String,
      required: [true, 'Please provide booking purpose']
    },
    expectedParticipants: {
      type: Number,
      required: [true, 'Please provide expected participants count'],
      min: [1, 'Participants must be at least 1']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending'
    },
    adminNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
