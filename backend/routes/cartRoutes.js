const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// ✅ Add item to cart
router.post('/add', async (req, res) => {
  const { userEmail, productId, quantity } = req.body;

  // Simple validation to avoid undefined error
  if (!userEmail || !productId || !quantity) {
    return res.status(400).json({ error: "userEmail, productId, and quantity are required." });
  }

  try {
    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get user cart
router.get('/:userEmail', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail }).populate("items.productId");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Remove item from cart
router.delete('/:userEmail/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
