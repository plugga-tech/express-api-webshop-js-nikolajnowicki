var express = require("express");
var router = express.Router();
const User = require("../models/users-model");
const bcrypt = require("bcrypt");

router.get("/", async function (req, res, next) {
  const users = await User.find();

  res.status(200).json(users);
});

router.get("/add", function (req, res, next) {
  res.send("Add user router");
});

router.post("/add", async function (req, res, next) {
  try {
    const { id, username, password, firstName, lastName, phoneNumber, email } =
      req.body;

    // hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      id,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/login", function (req, res, next) {
  res.send("Login user router");
});

module.exports = router;
