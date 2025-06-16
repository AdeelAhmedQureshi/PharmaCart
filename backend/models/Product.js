// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must not exceed 100 characters'],
    // to make this field unique each product name must be unique
    unique: true,
  },
  strength: {
    type: String,
    required: [true, 'Strength is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description must not exceed 1000 characters'],
  },
  image: {
    type: String, // Cloudinary image URL
    required: [true, 'Product image URL is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
