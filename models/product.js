const mongoose = require("mongoose");
const { stringify } = require("querystring");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      maxlength: [100, "Title can''t be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description must be added"],
      maxlength: [500, "Description can't be more than 500 characters"],
      minlength: [20, "Description can't be less than 20 characters"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity must be provided"],
    },
    numberOfSoldItems: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price must be provided"],
      max: [300000, "Maximum price on our web site is 300,000 pounds"],
    },
    ratingAverage: {
      type: Number,
      max: 5,
      min: 1,
    },
    ratingNumber: {
      type: Number,
      default: 0,
    },
    colors: [String],
    images: [String],
    coverImage: {
      type: String,
      required: [true, "Cover image must be provided"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "categorySchema",
      required: [true, "Product must belong to some category"],
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategorySchema",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brandSchema",
    },
  },
  { timestamps: true }
);
productSchema.post("save", function () {
  this.coverImage = `${process.env.BASE_URL}/product/${this.coverImage}`;
  const imageList = [];
  this.images.forEach((image) => {
    image = `${process.env.BASE_URL}/product/${image}`;
    imageList.push(image);
  });
  this.images = imageList;
});
productSchema.post("init", function () {
  this.coverImage = `${process.env.BASE_URL}/product/${this.coverImage}`;
  const imageList = [];
  this.images.forEach((image) => {
    image = `${process.env.BASE_URL}/product/${image}`;
    imageList.push(image);
  });
  this.images = imageList;
});
module.exports = mongoose.model("productschema", productSchema);
