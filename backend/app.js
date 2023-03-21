var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
let mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
let apiRouter = require("./routes/api");
var app = express();

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect("mongodb://127.0.0.1:27017/nikolajnowicki", options);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

init();

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
