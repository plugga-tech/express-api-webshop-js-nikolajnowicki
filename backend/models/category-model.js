let mongoose = require("mongoose");

let CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
