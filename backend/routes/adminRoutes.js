const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private (Admin Only)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Use req.user instead of req.userId (attached by verifyToken middleware)
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching admin profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/admin/users
// @desc    Fetch all users (Admin only)
// @access  Private (Admin Only)
router.get("/users", verifyToken, async (req, res) => {
  try {
    // Ensure that the user is an admin before fetching users
    if (!req.user.isAdmin)
      return res.status(403).json({ message: "Access denied" });

    // Fetch all users, excluding passwords
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
