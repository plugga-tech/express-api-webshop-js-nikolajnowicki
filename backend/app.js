var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
let mongoose = require("mongoose");
require("dotenv").config();
let bcrypt = require("bcrypt");
const User = require("./models/users-model");
const Product = require("./models/products-model");

var indexRouter = require("./routes/index");
let apiRouter = require("./routes/api");
var app = express();

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/nikolaj-nowicki",
      options
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

init();

async function populateServer() {
  const user = await User.findOne();
  if (!user) {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(
      process.env.DEFAULT_USER_PASSWORD,
      salt
    );

    await new User({
      name: "Default",
      email: "nikolajtest@mailinator.com",
      password: hashedPassword,
    }).save();

    await Promise.all([
      new Product({
        name: "Nike Air Max 90",
        description: "Classic Nike Air Max 90",
        price: "80",
        lager: "120",
        category: "Shoes",
      }).save(),

      new Product({
        name: "Adidas Yeezy Boost 350 V2",
        description: "Classic adidas Yeezy Boost 350 V2",
        price: "48",
        lager: "70",
        category: "Shoes",
      }).save(),

      new Product({
        name: "Reebok Classic",
        description: "classic reebok shoes",
        price: "39",
        lager: "40",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Nike Air Max 270 Gel",
        description: "Super sonic shoes",
        price: "70",
        lager: "140",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Puma Axelion Refresh",
        description: "Test skor",
        price: "100",
        lager: "37",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Adidas Alhaboost V1",
        description: "Comfterble shoes",
        price: "80",
        lager: "150",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Tommy Hilfiger Corporate Runner",
        description: "The best shoes for a working man",
        price: "50",
        lager: "30",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Lacoste Carnaby Evo",
        description: "Croco shoes",
        price: "399",
        lager: "36",
        category: "Shoes",
      }).save(),
      new Product({
        name: "Leather Jacket Black",
        description: "Black color leather jacket",
        price: "40",
        lager: "30",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Brown",
        description: "Brown color leather jacket",
        price: "50",
        lager: "20",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Red",
        description: "Brown color leather jacket",
        price: "40",
        lager: "30",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Blue",
        description: "Blue color leather jacket",
        price: "40",
        lager: "50",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Yellow",
        description: "Yellow color leather jacket",
        price: "30",
        lager: "20",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Green",
        description: "Green color leather jacket",
        price: "40",
        lager: "30",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Red",
        description: "Red color leather jacket",
        price: "100",
        lager: "300",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Leather Jacket Gold",
        description: "Gold color leather jacket",
        price: "99",
        lager: "15",
        category: "Jackets",
      }).save(),
      new Product({
        name: "Red Hat",
        description: "Blue color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Blue Hat",
        description: "Blue color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Green Hat",
        description: "Green color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Yellow Hat",
        description: "Yellow color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "White Hat",
        description: "White color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Black Hat",
        description: "Black color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Gold Hat",
        description: "Gold color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
      new Product({
        name: "Magenta Hat",
        description: "Magenta color hat",
        price: "29",
        lager: "45",
        category: "Hats",
      }).save(),
    ]);
  }
}
populateServer();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api", apiRouter);

module.exports = app;
