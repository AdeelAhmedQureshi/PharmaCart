// middleware/userValidator.js
const { body } = require('express-validator');

exports.validateUser = [
  body('fullname')
    .notEmpty().withMessage('Fullname is required')
    .isLength({ min: 3 }).withMessage('Fullname must be at least 3 characters'),

  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['female', 'male', 'Prefer not to say']).withMessage('Gender must be female, male, or Prefer not to say'),

  body('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^03\d{9}$/).withMessage('Phone number must be in correct format, e.g., 03XXXXXXXXX'),

  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 10 }).withMessage('Address must be at least 10 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];
