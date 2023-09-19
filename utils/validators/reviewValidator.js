// schemas in use
const reviewSchema = require("../../models/review");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { check, body, params } = require("express-validator");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");
// create review validator
const createReviewValidator = [
  check("title").optional(),
  check("rating")
    .notEmpty()
    .withMessage("Rating must be added")
    .isFloat({ max: 5, min: 1 })
    .withMessage("Rating must be between 1 and 5"),
  check("user")
    .notEmpty()
    .withMessage("User field must be added")
    .isMongoId()
    .withMessage("Invalid User ID"),
  check("product")
    .notEmpty()
    .withMessage("Product field must be added")
    .isMongoId()
    .withMessage("Invalid Product ID")
    .custom(async (val, { req }) => {
      // make sure that user has only review/product
      const review = await reviewSchema.findOne({
        user: req.user._id,
        product: req.body.product,
      });

      if (review) {
        throw new BadRequestError("Duplicate review");
      }
    }),
  validatorMiddleware,
];
// get review validator
const getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review ID"),
  validatorMiddleware,
];
// update review validator
const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID")
    .custom(async (val, { req }) => {
      // make sure that user has only review/product
      const review = await reviewSchema.findOne({ val });
      if (!review) {
        throw new NotFoundError("No review with this ID");
      }
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new UnauthorizedError("Not allowed to update");
      }
    }),
  validatorMiddleware,
];
// delete review validator
const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review ID")
    .custom(async (val, { req }) => {
      // make sure that user has only review/product
      const review = await reviewSchema.findOne(val);
      if (!review) {
        throw new NotFoundError("No review with this ID");
      }
      if (review.user.toString() !== req.user._id.toString()) {
        throw new UnauthorizedError("Not allowed to delete");
      }
    }),
  validatorMiddleware,
];
module.exports = {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
};
