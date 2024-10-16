const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you have a User model

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1]; // Get the token part

  try {
    // Decode the token and get the user ID
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace with your secret
    const user = await User.findByPk(decodedToken.userId); // Get the user from the token

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id, name: user.name }; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
