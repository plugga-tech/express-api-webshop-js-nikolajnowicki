var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Users router works");
});

router.get("/add", function (req, res, next) {
  res.send("Add user router");
});

router.get("/login", function (req, res, next) {
  res.send("Login user router");
});

module.exports = router;
