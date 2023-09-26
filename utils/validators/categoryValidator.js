const { param, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
// get category validator
const getCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid category ID format no id like this in mongo"),
  validatorMiddleware,
];
// create category validator
const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is a must format")
    .isLength({ min: 3 })
    .withMessage("Name length can't be less than 3")
    .isLength({ max: 50 })
    .withMessage("Name length can't be more than 50"),
  validatorMiddleware,
];
// delete category validator
const deleteCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid category ID format no id like this in mongo"),
  validatorMiddleware,
];
// Update category validator
const updateCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid category ID format no id like this in mongo"),
  validatorMiddleware,
];
module.exports = {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
