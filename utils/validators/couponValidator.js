const { param, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
// get Coupon validator
const getCouponValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID format no id like this in mongo"),
  validatorMiddleware,
];
// create Coupon validator
const createCouponValidator = [
  check("name").notEmpty().withMessage("Coupon name is a required format"),
  check("expire")
    .notEmpty()
    .withMessage("Coupon expireDate is a required format"),
  check("discount")
    .notEmpty()
    .withMessage("Coupon name is a required format")
    .isNumeric()
    .withMessage("coupon is a number")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount between 0 and 100 %"),
  validatorMiddleware,
];
// delete Coupon validator
const deleteCouponValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID format no id like this in mongo"),
  validatorMiddleware,
];
// Update Coupon validator
const updateCouponValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID format no id like this in mongo"),
  validatorMiddleware,
];
module.exports = {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
};
