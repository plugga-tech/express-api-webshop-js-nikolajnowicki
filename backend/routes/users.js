let express = require("express");
let router = express.Router();
let User = require("../models/users-model");
require("dotenv").config();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

router.get("/", async function (req, res, next) {
  let users = await User.find({}, { _id: 1, name: 1, email: 1 });
  res.status(200).json(users);
});

router.get("/add", function (req, res, next) {
  res.send("Add user router");
});

router.post("/", async function (req, res, next) {
  try {
    let findUser = await User.find({ _id: req.body.id });
    console.log(findUser);
    res.send(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async function (req, res, next) {
  try {
    let { name, email, password } = req.body;

    // hash the password before saving the user
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({
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

// ROUTER FOR LOGIN //

router.get("/login", function (req, res, next) {
  res.send("Login user router");
});

router.post("/login", async function (req, res) {
  try {
    let { email, password } = req.body;
    console.log(req.body);

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    let isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
