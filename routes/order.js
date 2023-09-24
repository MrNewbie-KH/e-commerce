// controllers
const {
  createCashOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatusToPaid,
  updateOrderStatusToDelivered,
} = require("../controllers/order");
const express = require("express");
// middlewares
const {
  authorizeMiddleware,
  authenticateMiddleware,
} = require("../middlewares/authMiddleware");
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
module.exports = router;
