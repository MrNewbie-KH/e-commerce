const {
  getAllSubCategories,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryId,
} = require("../controllers/subCategory");

const express = require("express");
const {
  createSubCategotyValidator,
  getSubCategotyValidator,
  updateSubCategotyValidator,
  deleteSubCategotyValidator,
} = require("../utils/validators/subCategoryValidator");
// allowing access parameters in different routes
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(getAllSubCategories)
  .post(setCategoryId, createSubCategotyValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategotyValidator, getSingleSubCategory)
  .delete(deleteSubCategotyValidator, deleteSubCategory)
  .patch(updateSubCategotyValidator, updateSubCategory);
module.exports = router;
