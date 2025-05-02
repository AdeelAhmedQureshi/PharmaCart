const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/CartRoutes'); 

// App Config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));  // Parse URL-encoded request bodies , extended:true ->Parses complex nested objects 
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
const db = process.env.MONGO_URI; // MongoDB URI from .env file
if (!db) {
  console.error("MONGO_DB URI not found in environment variables.");
  process.exit(1); // Exit the process with failure
}
mongoose.connect(db)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.error("MongoDB Connection Failed ❌", err));

// work flow (user ➔ route ➔ controller ➔ model)
// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/products', productRoutes); // Product routes
// app.use('/api/cart', cartRoutes);

app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.send("Welcome to PharmaCart API!");
});
// in last route we add to handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
