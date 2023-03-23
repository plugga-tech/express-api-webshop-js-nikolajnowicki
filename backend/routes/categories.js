let express = require("express");
let router = express.Router();
let Category = require("../models/category-model");
const tokenMiddleware = require("../utils/tokenMiddleware");

router.use(tokenMiddleware);

router.get("/", async function (req, res, next) {
  let categories = await Category.find({});
  res.status(200).json(categories);
});

router.post("/add", async (req, res) => {
  let name = req.body.name;

  let newCategory = new Category({
    name: name,
  });

  try {
    const savedCategory = await newCategory.save();

    return res.json(savedCategory);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create category" });
  }
});

module.exports = router;
