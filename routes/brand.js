const {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  imageResize,
} = require("../controllers/brand");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .get(getAllBrands)
  .post(uploadBrandImage, imageResize, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getSingleBrand)
  .delete(deleteBrandValidator, deleteBrand)
  .patch(updateBrandValidator, updateBrand);
module.exports = router;
