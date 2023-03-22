let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
require("dotenv").config();

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 80,
  },
});

module.exports = mongoose.model("User", UserSchema);
