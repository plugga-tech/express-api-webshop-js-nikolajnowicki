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
        name: "Test Sko",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),

      new Product({
        name: "Test Sko 2",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),

      new Product({
        name: "Test Sko 3",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),
      new Product({
        name: "Test Tröja",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "topwear",
      }).save(),
      new Product({
        name: "Test Byxor",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "pantalones",
      }).save(),
      new Product({
        name: "Test Sko 4",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),
      new Product({
        name: "Test Sko 4",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),
      new Product({
        name: "Test Sko 5",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),
      new Product({
        name: "Test Sko 6",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
      }).save(),

      new Product({
        name: "Test Sko 7",
        description: "Test skor",
        price: "10",
        lager: "100",
        category: "skor",
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
