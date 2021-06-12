const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");

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
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same"
    }
  }
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified.
  if (!this.isModified("password")) return next();
  // Hash this password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password Confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema);

module.exports = User;