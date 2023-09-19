const reviewSchema = require("../models/review");
const productSchema = require("../models/product");
const userSchema = require("../models/user");
const { NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
// ------------------------------
const setProductId = (req, res, next) => {
  if (!req.body.product) {
    req.body.product = req.params.productId;
  }
  next();
};
// --------------------------------
// create review
const createReview = async (req, res) => {
  // recieve body
  let productId = req.body.product;
  const userId = req.body.user;
  const product = await productSchema.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError("No Product with this ID");
  }
  const user = await userSchema.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("No user with this ID");
  }
  const review = await reviewSchema.create(req.body);
  // create user

  res.status(StatusCodes.CREATED).json({ review });
};
// get single review
const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await reviewSchema
    .findOne({ _id: reviewId })
    .populate({ path: "user", select: "name" });
  if (!review) {
    throw new NotFoundError("No review with this ID");
  }
  res.status(StatusCodes.OK).json({ review });
};
// get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await reviewSchema
    .find({ product: req.body.productId })
    .populate({ path: "user", select: "name" });
  res.status(StatusCodes.OK).json({ numberOfHits: reviews.length, reviews });
};
// update review
const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await reviewSchema.findOneAndUpdate(
    { _id: reviewId },
    { ...req.body },
    { new: true }
  );
  if (!review) {
    throw new NotFoundError("No review with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Updated successfully", review });
};
// delete review
const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const review = await reviewSchema.findOneAndDelete({ _id: reviewId });
  if (!review) {
    throw new NotFoundError("No review with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted successfully", review });
};
module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  setProductId,
};
