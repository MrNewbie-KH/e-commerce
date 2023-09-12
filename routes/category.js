const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  imageResize, // image processing
} = require("../controllers/category");
const {
  getCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");
// for creating nested routes mechanism
const subCategoryRoute = require("./subCategory");
const express = require("express");
const router = express.Router();
//nested route after /category
router.use("/:categoryId/sub-category", subCategoryRoute);
router
  .route("/")
  .get(getAllCategories)
  .post(
    uploadCategoryImage,
    imageResize,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .patch(
    uploadCategoryImage,
    imageResize,
    updateCategoryValidator,
    updateCategory
  );
module.exports = router;
