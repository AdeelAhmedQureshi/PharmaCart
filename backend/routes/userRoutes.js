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



// // routes/userRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');// user model

// const router = express.Router();

// // @route   POST /api/users/signup
// // @desc    Register new user
// // @access  Public
// router.post('/signup', async (req, res) => {
//   try {
//     const { fullname, email, password, phoneNumber, address, gender } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       address,
//       gender,
//       isAdmin: false, // always false by default
//     });

//     await user.save();

//     res.status(201).json({ message: 'User created successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong', error: err.message });
//   }
// });

// // @route   POST /api/users/login
// // @desc    Login user and get token
// // @access  Public
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_SECRET, // must be set in .env file
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ token, message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong', error: err.message });
//   }
// });

// module.exports = router;
