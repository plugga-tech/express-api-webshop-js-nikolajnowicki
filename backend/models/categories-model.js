let mongoose = require("mongoose");

let CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
