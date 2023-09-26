// controlles
const {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  imageResize,
} = require("../controllers/brand");
// validation
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .get(getAllBrands)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    uploadBrandImage,
    imageResize,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidator, getSingleBrand)
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    deleteBrandValidator,
    deleteBrand
  )
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    updateBrandValidator,
    updateBrand
  );
module.exports = router;
