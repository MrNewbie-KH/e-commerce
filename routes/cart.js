// controllers
const {
  addProductToCart,
  getUserCart,
  removeItem,
  clearCartItem,
  updateQuantity,
  applyCoupon,
} = require("../controllers/cart");

// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();
router.use(authenticateMiddleware, authorizeMiddleware("user"));
router.route("/").post(addProductToCart).get(getUserCart).delete(clearCartItem);
router.route("/apply-coupon").post(applyCoupon);
router.route("/:id").get(removeItem).patch(updateQuantity);
module.exports = router;
