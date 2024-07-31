const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const validate = require('./validate');

exports.new = [
  body('name').exists({ values: 'falsy' }).withMessage('Name is required'),
  body('theme')
    .isIn(['light', 'dark', 'lightBlue'])
    .withMessage('Theme must be one of light, dark or lightBlue'),
  body('messages'),
  body('folder')
    .custom((folderId) => folderId && mongoose.Types.ObjectId.isValid(folderId))
    .withMessage('Folder ID is invalid'),
  body('messages.*.type')
    .isIn(['bubble', 'input'])
    .withMessage('Message type must be one of bubble or input'),
  body('messages.*.valueType')
    .isIn([
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
    ])
    .withMessage(
      'Message valueType must be one of text, image, video, gif, number, email, phone, date, rating, button',
    ),
  validate,
];

exports.paramId = [
  param('id')
    .notEmpty()
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage('Invalid formbot Id'),
  validate,
];
