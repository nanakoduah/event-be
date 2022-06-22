const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Invalid category id'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    trim: true,
    validate: [
      (value) => new Date() < value,
      'Date must be greater than today',
    ],
  },
  isVirtual: {
    type: Boolean,
    required: [true, 'Indicate event type'],
  },
  address: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Created user is required'],
  },
});

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
