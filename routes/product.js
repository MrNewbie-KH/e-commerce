const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  createProductValidator,
  genericValidator,
} = require("../utils/validators/productValidator");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .get(getAllProducts)
  .post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(genericValidator, getSingleProduct)
  .delete(genericValidator, deleteProduct)
  .patch(genericValidator, updateProduct);
module.exports = router;
