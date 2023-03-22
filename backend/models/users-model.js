let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
require("dotenv").config();

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
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
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
