const productSchema = require("./product");
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
// Aggregation Pipeline
reviewSchema.statics.calcRatingAverageAndRatingNumber = async function (
  productId
) {
  const answer = await this.aggregate([
    // 1) stage 1 match all reviews where product is this ID
    { $match: { product: productId } },
    // 2) stage group calc avg and sum++
    {
      $group: {
        _id: "product",
        ratingAverage: { $avg: "$rating" },
        ratingNumber: { $sum: 1 },
      },
    },
  ]);
  // 3) save 2 new values to the schema
  console.log(answer);
  if (answer.length > 0) {
    await productSchema.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        ratingAverage: answer[0].ratingAverage,
        ratingNumber: answer[0].ratingNumber,
      },
      { new: true }
    );
  } else {
    await productSchema.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        ratingAverage: 0,
        ratingNumber: 0,
      },
      { new: true }
    );
  }
};
// calc pipeline when create
reviewSchema.post("save", async function () {
  await this.constructor.calcRatingAverageAndRatingNumber(this.product);
});
module.exports = mongoose.model("reviewSchema", reviewSchema);
