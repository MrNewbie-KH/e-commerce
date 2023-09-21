// controllers
const {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupon");
// validation
const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require("../utils/validators/couponValidator");
// auth middleware
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
router.use(authenticateMiddleware, authorizeMiddleware("admin"));
router.route("/").get(getAllCoupons).post(createCoupon);
router
  .route("/:id")
  .get(getSingleCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

module.exports = router;
