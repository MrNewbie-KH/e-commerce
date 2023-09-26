const userSchema = require("../models/user");
const productSchema = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
// add product to wishList
const addProductToWishlist = async (req, res) => {
  const user = await userSchema.findOne({ _id: req.user._id });
  const productId = req.body.product;
  const product = await productSchema.findById(productId);
  if (!product) {
    throw new NotFoundError("No product with this Id");
  }
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
  }
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "Product added successfully to wishList",
    wishList: user.wishlist,
  });
};
const deleteProductFromWishlist = async (req, res) => {
  const user = await userSchema.findOne({ _id: req.user._id });
  const productId = req.params.id;
  const product = await productSchema.findById(productId);
  if (!product) {
    throw new NotFoundError("No product with this Id");
  }
  if (user.wishlist.includes(productId)) {
    const index = user.wishlist.indexOf(productId);
    user.wishlist.pop(index);
  }
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "Product Removed successfully from wishList",
    wishList: user.wishlist,
  });
};
const getMyWishlist = async (req, res) => {
  const user = await userSchema
    .findById({ _id: req.user._id })
    .populate("wishlist");
  res.status(StatusCodes.OK).json({
    msg: "My wishList",
    wishList: user.wishlist,
  });
};
module.exports = {
  addProductToWishlist,
  deleteProductFromWishlist,
  getMyWishlist,
};
