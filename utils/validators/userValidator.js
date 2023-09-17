const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { BadRequestError } = require("../../errors");
// create user validatior
const createUserValidator = [
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

  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is a required field")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new BadRequestError("Passwords do not match");
      }
      return true; // Return true if the validation passes
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is a required field")
    .isEmail()
    .withMessage("Please enter a valid email like abc@mail.com"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .isString()
    .withMessage("Phone number must be a string"),
  check("profileImage")
    .optional()
    .isString()
    .withMessage("Profile Image must be provided as a file "),
  check("role").optional().isString().withMessage("Role must be a string"),
  validatorMiddleware,
];
// update password validator

const updatePasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Enter your current password"),
  check("newPassword")
    .notEmpty()
    .withMessage("Enter your new password")
    .isLength({ min: 6 })
    .withMessage("Too short password"),

  check("confirmNewPassword")
    .notEmpty()
    .withMessage("confirm password is a required field")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new BadRequestError("Passwords do not match");
      }
      return true; // Return true if the validation passes
    }),
  validatorMiddleware,
];
// get user validator
const getUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User ID format no id like this in mongo"),
  validatorMiddleware,
];
// delete user validator
const deleteUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User ID format no id like this in mongo"),
  validatorMiddleware,
];
// Update User validator
const updateUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User ID format no id like this in mongo"),
  validatorMiddleware,
];
module.exports = {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updatePasswordValidator,
};
