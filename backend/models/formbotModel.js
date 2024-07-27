const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bubble', 'input'],
    required: true,
  },
  valueType: {
    type: String,
    enum: [
      'text',
      'image',
      'video',
      'gif',
      'number',
      'email',
      'phone',
      'date',
      'rating',
      'button',
    ],
    required: true,
  },
  value: String,
});

const formbotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
    enum: ['light', 'dark', 'tail blue'],
  },
  messages: {
    type: [messageSchema],
    required: true,
  },
  folder: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
});

const Formbot = mongoose.model('Formbot', formbotSchema);

module.exports = Formbot;
