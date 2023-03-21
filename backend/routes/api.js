var express = require("express");
var router = express.Router();
var usersRouter = require("./users");
var productsRouter = require("./products");
var categoriesRouter = require("./categories");
var ordersRouter = require("./orders");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("API is working");
});

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);

module.exports = router;
