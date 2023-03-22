var express = require("express");
var router = express.Router();
let Category = require("../models/category-model");

router.get("/", async function (req, res, next) {
  let categories = await Category.find({});
  res.status(200).json(categories);
});

router.post("/add", async (req, res) => {
  let name = req.body.name;
  let token = req.body.token;

  // Check if token is valid
  if (token !== "1234key1234") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Create a new category object
  let newCategory = new Category({
    name: name,
  });

  try {
    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Return the saved category object
    return res.json(savedCategory);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create category" });
  }
});

module.exports = router;
