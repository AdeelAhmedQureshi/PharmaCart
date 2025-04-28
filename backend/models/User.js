const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); // For password hashing

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "FullName is required"],
      minlength: [3, "FullName must be at least 3 characters"],
    },
    gender: {
      type: String,
      enum: ["female", "male", "Prefer not to say"],
      default: "female",
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^03\d{9}$/, "Invalid phone number format"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [10, "Address must be at least 10 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // by default every user is not admin
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
