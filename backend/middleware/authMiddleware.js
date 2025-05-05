const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // Check if the authorization header exists and split the token from 'Bearer token'
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user info (id, isAdmin) in the request object for later use
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error verifying token:", err); // Log the error to the console for debugging
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
