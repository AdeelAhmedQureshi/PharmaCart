// middleware/validateRequest.js
const { validationResult } = require('express-validator');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(err => err.msg) 
    });    
  }

  next();  // everything is fine, Go to the next middleware or controller
};
