const { param, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// get subCategoty validator
const getSubCategotyValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid subCategoty ID format no id like this in mongo"),
  validatorMiddleware,
];
// create subCategoty validator
const createSubCategotyValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategoty name is a must format")
    .isLength({ max: 50 })
    .withMessage("Name length can't be more than 50"),
  check("categoryId")
    .isMongoId()
    .withMessage("Validate => add valid category ID"),
  validatorMiddleware,
];
// delete subCategoty validator
const deleteSubCategotyValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid subCategoty ID format no id like this in mongo"),
  validatorMiddleware,
];
// Update subCategoty validator
const updateSubCategotyValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid subCategoty ID format no id like this in mongo"),
  validatorMiddleware,
];
module.exports = {
  createSubCategotyValidator,
  getSubCategotyValidator,
  updateSubCategotyValidator,
  deleteSubCategotyValidator,
};
