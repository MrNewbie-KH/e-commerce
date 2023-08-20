const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: [true, "Category must be Unique"],
      minlength: [3, "Too shrt name min 3"],
      maxlength: [50, "too long name max 50"],
      trim: true,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("categorySchema", categorySchema);
