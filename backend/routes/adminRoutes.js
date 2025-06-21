const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");
const Product = require("../models/Product");
// const Order = require("../models/Order");

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private (Admin Only)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Use req.user instead of req.userId (attached by verifyToken middleware)
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching admin profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// to get all customers(users)
// @route   GET /api/admin/users
// @desc    Fetch all users (Admin only)
// @access  Private (Admin Only)
router.get("/users", verifyToken, async (req, res) => {
  try {
    // Ensure that the user is an admin before fetching users
    if (!req.user.isAdmin)
      return res.status(403).json({ message: "Access denied" });

    // Fetch all users, excluding passwords
    const users = await User.find({ isAdmin: false }).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// To get stats (total products, customers, orders and earnings)
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const [totalProducts, totalCustomers, totalOrders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ isAdmin: false }), // customers only
      // Order.countDocuments(),
    ]);

    // const totalEarningsData = await Order.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       total: { $sum: "$totalPrice" }, // assuming `totalPrice` in Order model
    //     },
    //   },
    // ]);

    // const totalEarnings = totalEarningsData[0]?.total || 0;

    res.json({
      totalProducts,
      totalCustomers,
      // totalOrders,
      // totalEarnings,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;
