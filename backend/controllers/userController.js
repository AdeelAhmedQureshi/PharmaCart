// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User'); // import User model

// @desc    Register new user
exports.registerUser = async (req, res) => {
  // Check for validation errors
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const { fullname, email, password, phoneNumber, address, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      gender,
      isAdmin: false,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// @desc    Login user
exports.loginUser = async (req, res) => {
  // Check for validation errors
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },  //  id and isAdmin are included in the token payload`
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      isAdmin: user.isAdmin,
      // Add any other user fields you need
      },
      message: 'Login successful'
    }); 
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
