const mongoose = require("mongoose");
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Brand name"],
      unique: [true, "Brand must be Unique"],
      minlength: [3, "Too shrt name min 3"],
      maxlength: [50, "too long name max 50"],
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("brandSchema", brandSchema);
