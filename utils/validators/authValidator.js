const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { BadRequestError } = require("../../errors");
//  Register validatior
const registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required field")
    .isLength({ max: 40 })
    .withMessage("Name can't be more than 40 chars"),
  check("password")
    .notEmpty()
    .withMessage("Password is a required field")
    .isLength({ min: 6 })
    .withMessage("Password can't be less than 6 chars"),
  check("email")
    .notEmpty()
    .withMessage("Email is a required field")
    .isEmail()
    .withMessage("Please enter a valid email like abc@mail.com"),
  validatorMiddleware,
];
// Login validator
const loginValidator = [
  check("password")
    .notEmpty()
    .withMessage("Password is a required field")
    .isLength({ min: 6 })
    .withMessage("Password can't be less than 6 chars"),
  check("email")
    .notEmpty()
    .withMessage("Email is a required field")
    .isEmail()
    .withMessage("Please enter a valid email like abc@mail.com"),
  validatorMiddleware,
];

module.exports = {
  registerValidator,
  loginValidator,
};
