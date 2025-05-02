// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/userValidator');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

// Signup Route
router.post(
  '/signup',
  validateUser,
  validateRequest,
  registerUser
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

module.exports = router;
