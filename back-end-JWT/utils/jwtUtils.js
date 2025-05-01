const jwt = require("jsonwebtoken");

// jwt.sign(payload(jekuno data), secretOrPrivateKey, [options, callback])

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//*ata manually token chech korar jonno passport-jwt takle ati lage na

// exports.verifyToken = (token) => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error("Missing JWT_SECRET in environment variables");
//   }

//   return jwt.verify(token, process.env.JWT_SECRET);
// };
