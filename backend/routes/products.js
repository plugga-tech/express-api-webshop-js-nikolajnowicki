var express = require("express");
var router = express.Router();
const Product = require("../models/products-model");

router.get("/", async function (req, res, next) {
  const products = await Product.find({});
  res.status(200).json(products);
});

router.get("/:id", async function (req, res, next) {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

router.get("/add", function (req, res, next) {
  res.send("Add products router router");
});

router.post("/add", async function (req, res, next) {
  try {
    const { name, description, price, lager, category, token } = req.body;

    const product = new Product({
      name,
      description,
      price,
      lager,
      category,
      token,
    });
    await product.save();
    res.status(201).send("Product has been added!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/categories/", async function (req, res, next) {
  return res.status(400).json({ message: "Please specify a category" });
});

router.get("/category/:category?", async function (req, res, next) {
  const category = req.params.category;
  if (!category) {
    return res.status(400).json({ message: "Please enter a valid category" });
  }
  const products = await Product.find({ category: category });
  if (!products.length) {
    return res.status(404).json({ message: "No products found" });
  }
  res.status(200).json(products);
});
module.exports = router;
