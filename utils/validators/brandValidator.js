const { param, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
// get Brand validator
const getBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID format no id like this in mongo"),
  validatorMiddleware,
];
// create Brand validator
const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is a must format")
    .isLength({ min: 3 })
    .withMessage("Name length can't be less than 3")
    .isLength({ max: 50 })
    .withMessage("Name length can't be more than 50"),
  validatorMiddleware,
];
// delete Brand validator
const deleteBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID format no id like this in mongo"),
  validatorMiddleware,
];
// Update Brand validator
const updateBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID format no id like this in mongo"),
  validatorMiddleware,
];
module.exports = {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};
