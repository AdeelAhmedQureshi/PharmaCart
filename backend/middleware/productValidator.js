// middleware/productValidator.js
const { body } = require('express-validator');

exports.validateProduct = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2 }).withMessage('Product name must be at least 2 characters')
    .isLength({ max: 100 }).withMessage('Product name should not exceed 100 characters'),

  body('strength')
    .notEmpty().withMessage('Strength is required')
    .isString().withMessage('Strength must be a string'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description should not exceed 500 characters'),

  // Image validation is handled separately in controller
];
