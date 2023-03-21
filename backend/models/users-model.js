const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60,
    trim: true,
  },
  firstName: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 50,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
