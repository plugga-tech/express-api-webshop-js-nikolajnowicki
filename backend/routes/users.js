var express = require("express");
var router = express.Router();
const User = require("../models/users-model");
const bcrypt = require("bcrypt");

router.get("/", async function (req, res, next) {
  const users = await User.find({}, { _id: 1, name: 1, email: 1 });
  res.status(200).json(users);
});

router.get("/add", function (req, res, next) {
  res.send("Add user router");
});

router.post("/", async function (req, res, next) {
  try {
    const findUser = await User.find({ _id: req.body.id });
    console.log(findUser);
    res.send(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
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
