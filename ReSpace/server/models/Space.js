const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a space name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: 'State' },
      zipCode: { type: String, default: '' }
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Park',
        'Community Hall',
        'Library',
        'Sports Ground',
        'Auditorium',
        'Rooftop',
        'Courtyard',
        'Co-working'
      ]
    },
    capacity: {
      type: Number,
      required: [true, 'Please specify maximum capacity'],
      min: [1, 'Capacity must be at least 1']
    },
    facilities: [
      {
        type: String
      }
    ],
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    hourlyRate: {
      type: Number,
      default: 0
    },
    rules: [
      {
        type: String
      }
    ],
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Space', spaceSchema);
