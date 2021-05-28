const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "PLease provide your email"],
    unique: true,
    lowercase: true,
    validate:[validator.isEmail, "Please provide a valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8
  },
  passwordConfirm:{
    type: String,
    required: [true, "Please confirm your password"]
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;