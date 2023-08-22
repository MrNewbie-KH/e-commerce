const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Sub-category name"],
      unique: [true, "ub-Category must be Unique"],
      maxlength: [50, "too long name max 50"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "categorySchema",
      required: [true, "Please provide a category name"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategorySchema", subCategorySchema);
