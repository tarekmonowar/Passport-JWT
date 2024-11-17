const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

//register/login
app.use("/auth", authRoutes);

//route not found
app.use((req, res, next) => {
  res.status(500).send("incorrect route Tarek!");
});
//server error
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log the error in the console
  res.status(500).send("Something broke! monowar!!"); // Send the response
});

module.exports = app;
