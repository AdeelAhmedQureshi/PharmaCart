// controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// @desc    Add a new product  protected route controller
exports.addProduct = async (req, res) => {
  try {
    if (!req.file) {   //express-validator for handle req.file (image file) so we handle manually in controller side.
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Upload image to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'pharmacart_products' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
        }

        // After image is uploaded successfully
        const { name, strength, category, price, description } = req.body;

        const newProduct = new Product({
          name,
          strength,
          category,
          price,
          description,
          image: result.secure_url, // Cloudinary URL
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
      }
    );

    stream.end(req.file.buffer); // Upload the buffer
  }catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};


// @desc    Delete a product
// @route   DELETE /api/products/deleteproduct/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Get public_id from Cloudinary image URL
    const publicId = product.image.split('/').pop().split('.')[0];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`pharmacart_products/${publicId}`);

    // Delete from MongoDB
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/updateproduct/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If new image uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`pharmacart_products/${publicId}`);

      // Upload new image
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'pharmacart_products' },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          stream.end(req.file.buffer);
        });
      };

      const uploadResult = await streamUpload(req);
      product.image = uploadResult.secure_url;
    }

    // Update other fields
    const { name, strength, category, price, description } = req.body;
    if (name) product.name = name;
    if (strength) product.strength = strength;
    if (category) product.category = category;
    if (price) product.price = price;
    if (description) product.description = description;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};


// @desc    Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
