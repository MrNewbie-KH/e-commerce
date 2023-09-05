const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required field")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 100 })
    .withMessage("Tiltle can't be more Than 50 characters"),
  check("description")
    .notEmpty()
    .withMessage("Description is required field")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 500 })
    .withMessage("Description can't be more Than 500 characters")
    .isLength({ min: 20 })
    .withMessage("Description can't be less Than 20 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required field")
    .isNumeric()
    .withMessage("Quantity must be a Number"),
  check("numberOfSoldItems")
    .optional()
    .isNumeric()
    .withMessage("Sold must be a Number"),
  check("price")
    .notEmpty()
    .withMessage("Price is required field")
    .isNumeric()
    .withMessage("Price must be a Number")
    .custom((value) => {
      if (value <= 300000) return true;
    })
    .withMessage("Price can't be more than 300,000 EG"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("Rating must be a Number")
    .isLength({ max: 5 })
    .withMessage("Average Rating must be between 1 and 5"),
  check("colors").optional().isArray().withMessage("colors must be an array"),
  check("coverImage").notEmpty().withMessage("Cover image is required field"),
  check("category")
    .notEmpty()
    .withMessage("Category is a must field")
    .isMongoId()
    .withMessage("Invalid mongo id value"),
  validatorMiddleware,
];
const genericValidator = [
  check("id")
    .notEmpty()
    .withMessage("Id of product must be provided")
    .isMongoId()
    .withMessage("Invalid mongo id value"),
  validatorMiddleware,
];
module.exports = {
  createProductValidator,
  genericValidator,
};
