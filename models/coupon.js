const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Coupon name is a required field"],
      trim: true,
      unique: [true, "Duplicate name"],
    },
    expire: {
      type: Date,
      required: [true, "Expiration date is a required field"],
    },
    discount: {
      type: Number,
      max: 100,
      min: 0,
      required: [true, "Discount value is a required field"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("couponSchema", couponSchema);
