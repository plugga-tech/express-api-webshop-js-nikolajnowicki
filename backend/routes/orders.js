let express = require("express");
let router = express.Router();
let Order = require("../models/orders-model");

router.get("/", function (req, res, next) {
  res.send("Orderss router works");
});

router.get("/all/:token", async (req, res) => {
  let token = req.params.token;

  if (token !== "1234key1234") {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const orders = await Order.find();

    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not get orders" });
  }
});

router.post("/add", async (req, res) => {
  try {
    let { user, products } = req.body;

    let newOrder = new Order({
      user,
      products,
      date: new Date(),
    });

    let savedOrder = await newOrder.save();

    return res.json(savedOrder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create order" });
  }
});

router.get("/user", function (req, res, next) {
  res.send("user order router");
});

router.post("/user", async (req, res) => {
  let userId = req.body.user;
  let token = req.body.token;

  if (token !== "1234key1234") {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    let orders = await Order.find({ user: userId });

    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not get user orders" });
  }
});

module.exports = router;
