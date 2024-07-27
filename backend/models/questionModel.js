const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  formbot: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  serialNo: {
    type: Number,
    required: true,
  },
  messageType: {
    type: String,
    enum: ['bubble', 'input'],
    required: true,
  },
  messageValueType: {
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

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
