let mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

OrderSchema.pre("save", async function (next) {
  try {
    for (let product of this.products) {
      let productId = product.productId;
      let quantity = product.quantity;

      let foundProduct = await mongoose.model("Product").findById(productId);
      foundProduct.lager -= quantity;

      await foundProduct.save();
    }

    next();
  } catch (err) {
    next(err);
  }
});

let Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
