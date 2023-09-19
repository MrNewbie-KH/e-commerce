// controllers
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  imageResize,
  uploadImages,
} = require("../controllers/product");
// validation
const {
  createProductValidator,
  genericValidator,
} = require("../utils/validators/productValidator");
// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
// nested route to handle reviews in product
const reviewRoute = require("../routes/review");
// nesting
router.use("/:productId/review", reviewRoute);
router
  .route("/")
  .get(getAllProducts)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    uploadImages,
    imageResize,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(genericValidator, getSingleProduct)
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    genericValidator,
    deleteProduct
  )
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    genericValidator,
    updateProduct
  );
module.exports = router;
