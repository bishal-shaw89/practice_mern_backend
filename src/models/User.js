const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  vehicles: [String],
});

// Generate authentication token
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, config.secretKey, {
    expiresIn: "7d",
  });

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
