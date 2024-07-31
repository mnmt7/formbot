const { body } = require('express-validator');
const mongoose = require('mongoose');

const validate = require('./validate');

exports.new = [
  body('name').notEmpty().withMessage('Name is required'),
  body('parent')
    .custom((parentId) => parentId && mongoose.Types.ObjectId.isValid(parentId))
    .withMessage('Parent ID is invalid'),
  validate,
];
