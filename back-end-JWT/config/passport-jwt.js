const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log("JWT Payload received:", jwt_payload);

    try {
      const user = await User.findOne({ _id: jwt_payload.id });

      if (!user) {
        console.log("No user found with this ID");
        return done(null, false);
      }

      console.log("User found:", user);
      return done(null, user);
    } catch (err) {
      console.log("Error during user lookup:", err);
      return done(err, false); // Return error if user lookup fails
    }
  }),
);

module.exports = passport;
