const { body } = require('express-validator');

const User = require('../models/userModel');

module.exports = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),
];
