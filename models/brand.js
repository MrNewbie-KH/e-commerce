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
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
brandSchema.post("init", function (document) {
  if (document.image) {
    const imageURL = `${process.env.BASE_URL}/brand/${document.image}`;
    document.image = imageURL;
  }
});
brandSchema.post("save", function (document) {
  if (document.image) {
    const imageURL = `${process.env.BASE_URL}/brand/${document.image}`;
    document.image = imageURL;
  }
});
module.exports = mongoose.model("brandSchema", brandSchema);
