const {
  addProductToWishlist,
  deleteProductFromWishlist,
  getMyWishlist,
} = require("../controllers/wishlist");
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
router.post(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("user"),
  addProductToWishlist
);
router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeMiddleware("user"),
  deleteProductFromWishlist
);
router.get(
  "/",
  authenticateMiddleware,
  authorizeMiddleware("user"),
  getMyWishlist
);
module.exports = router;
