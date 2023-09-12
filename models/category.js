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
    image: {
      type: String,
      // required: [true, 'Please provide a category Image "from database"'],
    },
  },
  { timestamps: true }
);
categorySchema.post("init", function (document) {
  if (document.image) {
    const imageURL = `${process.env.BASE_URL}/category/${document.image}`;
    document.image = imageURL;
  }
});
categorySchema.post("save", function (document) {
  if (document.image) {
    const imageURL = `${process.env.BASE_URL}/category/${document.image}`;
    document.image = imageURL;
  }
});
module.exports = mongoose.model("categorySchema", categorySchema);
