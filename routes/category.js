const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
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
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .delete(deleteCategoryValidator, deleteCategory)
  .patch(updateCategoryValidator, updateCategory);
module.exports = router;
