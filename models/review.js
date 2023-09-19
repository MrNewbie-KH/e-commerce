const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, "Minimum Rating is 1"],
      max: [5, "Maximum Rating is 5"],
      required: [true, "Rating is a required field"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "userSchema",
      required: [true, "User is a required field"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "productSchema",
      required: [true, "Product is a required field"],
    },
  },
  { timestamps: true }
);
// creating compound index to make sure that each user can have review/product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });
module.exports = mongoose.model("reviewSchema", reviewSchema);
