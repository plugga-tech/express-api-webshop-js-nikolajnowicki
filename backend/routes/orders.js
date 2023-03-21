var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Orderss router works");
});

router.get("/all", function (req, res, next) {
  res.send("All orders router");
});

router.get("/add", function (req, res, next) {
  res.send("Add order router");
});

router.get("/user", function (req, res, next) {
  res.send("user order router");
});

module.exports = router;
