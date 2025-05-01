const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkUser = await User.findOne({ username: username });
    if (checkUser) {
      return res.status(400).json({ message: "Username already registered" });
    }
    const checkUserEmail = await User.findOne({ email: email });
    if (checkUserEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const user = await User.create({ username, email, password });
    // const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, username, email } }); //token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(password === user.password)) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: " incoreact username/password",
      });
    }
    const token = generateToken(user);
    res.json({
      user: {
        id: user._id,
        username: user.username,
        message: "login succes",
      },
      token: "Bearer " + token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
