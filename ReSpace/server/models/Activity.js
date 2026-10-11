const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an activity title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Workshop',
        'Sports',
        'Cultural',
        'Education',
        'Meeting',
        'Social Cause',
        'Fitness',
        'Other'
      ]
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      required: true
    },
    date: {
      type: Date,
      required: [true, 'Please specify activity date']
    },
    startTime: {
      type: String,
      required: [true, 'Please specify start time']
    },
    endTime: {
      type: String,
      required: [true, 'Please specify end time']
    },
    expectedParticipants: {
      type: Number,
      default: 20
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Activity', activitySchema);
