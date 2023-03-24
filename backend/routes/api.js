let express = require("express");
let router = express.Router();
let usersRouter = require("./users");
let productsRouter = require("./products");
let categoriesRouter = require("./categories");
let ordersRouter = require("./orders");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("API is working");
});

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);

router.get("/getApiKey", (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

module.exports = router;
