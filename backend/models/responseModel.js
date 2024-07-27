const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    formbot: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    response: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true },
  },
);

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
