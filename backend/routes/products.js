var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Prod router works");
});

router.get("/add", function (req, res, next) {
  res.send("Add products router router");
});

router.get("/category", function (req, res, next) {
  res.send("category router");
});

module.exports = router;
