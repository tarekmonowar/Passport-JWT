const express = require("express");
const passport = require("passport");
require("../config/passport-jwt"); // Assuming this file contains the Passport JWT setup
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Profile Route (requires JWT authentication)
router.get(
  "/profile",
  (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);
    next(); // Move to the next middleware (passport)
  },
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    console.log("JWT Payload:", req.user); // Log the payload after successful authentication
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or missing token" });
    }
    res.status(200).json(req.user);
  }
);

module.exports = router;
