let express = require("express");
let router = express.Router();
let Product = require("../models/products-model");
let Category = require("../models/category-model");
const tokenMiddleware = require("../utils/tokenMiddleware");

router.use(tokenMiddleware);

router.get("/", async function (req, res, next) {
  let products = await Product.find({});
  res.status(200).json(products);
});

router.get("/:id", async function (req, res, next) {
  let productId = req.params.id;
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

router.post("/add", async function (req, res, next) {
  try {
    let { name, description, price, lager, category, token } = req.body;

    let productCategory = await Category.findOne({ name: category });
    if (!productCategory) {
      productCategory = new Category({ name: category });
      await productCategory.save();
    }

    let product = new Product({
      name,
      description,
      price,
      lager,
      category: category,
      token,
    });
    await product.save();
    res.status(201).send("Product has been added!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/categories", async function (req, res, next) {
  return res.status(400).json({ message: "Please specify a category" });
});

router.get("/category/:category", async function (req, res, next) {
  try {
    let category = req.params.category;
    let products = await Product.find({ category: category });
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
