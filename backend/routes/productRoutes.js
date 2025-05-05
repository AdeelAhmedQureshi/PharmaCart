// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProductById } = require('../controllers/productController');
const { validateProduct } = require('../middleware/productValidator');
const { validateRequest } = require('../middleware/validateRequest');

// @route   POST /api/products/addproduct
// @desc    Add a new product
// @access  Private
router.post(
  '/addproduct',
  upload.single('image'),
  validateProduct,
  validateRequest,
  addProduct
);

// --> because action is decided by HTTP method (GET, POST, PUT, DELETE), not by writing it in the URL.
// Delete product
router.delete('/deleteproduct/:id', deleteProduct);

// Update product
router.put('/updateproduct/:id', upload.single('image'), validateProduct, validateRequest, updateProduct);

// @desc    Get a single product by ID
// @route   GET /api/products/getproduct/:id
// @access  Public
router.get('/getproduct/:id', getProductById);

// @route   GET /api/products/
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);

module.exports = router;
