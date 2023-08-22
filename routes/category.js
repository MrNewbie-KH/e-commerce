const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
// for creating nested routes mechanism
const subCategoryRoute = require("./subCategory");
const express = require("express");
const router = express.Router();
//nested route
router.use("/:categoryId/sub-category", subCategoryRoute);
router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .delete(deleteCategory)
  .patch(updateCategory);
module.exports = router;
