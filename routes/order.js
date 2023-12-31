// controllers
const {
  createCashOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatusToPaid,
  updateOrderStatusToDelivered,
  checkoutSession,
} = require("../controllers/order");
const express = require("express");
// middlewares
const {
  authorizeMiddleware,
  authenticateMiddleware,
} = require("../middlewares/authMiddleware");
// --------------------------
const router = express.Router();
router.use(authenticateMiddleware, authorizeMiddleware("user", "admin"));
router.route("/").get(getAllOrders);
router.route("/:id").post(createCashOrder).get(getSingleOrder);
router.patch(
  "/:id/paid",
  authorizeMiddleware("admin"),
  updateOrderStatusToPaid
);
router.patch(
  "/:id/delivered",
  authorizeMiddleware("admin"),
  updateOrderStatusToDelivered
);
router
  .route("/checkout-session/:id")
  .get(authenticateMiddleware, authorizeMiddleware("user"), checkoutSession);
module.exports = router;
