//controllers
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  setProductId,
} = require("../controllers/review");
// validation
const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");
// middleware
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
// Routing
const express = require("express");
// for nested params mergeParams
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(setProductId, getAllReviews)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("user", "admin"),
    setProductId,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getSingleReview)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("user"),
    deleteReviewValidator,
    deleteReview
  );
module.exports = router;
