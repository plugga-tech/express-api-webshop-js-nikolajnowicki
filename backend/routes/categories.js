var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Categories router works");
});

router.get("/add", function (req, res, next) {
  res.send("Add category router router");
});

module.exports = router;
