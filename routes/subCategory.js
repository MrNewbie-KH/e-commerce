const {
  getAllSubCategories,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategory");

const express = require("express");
// allowing access parameters in different routes
const router = express.Router({ mergeParams: true });
router.route("/").get(getAllSubCategories).post(createSubCategory);
router
  .route("/:id")
  .get(getSingleSubCategory)
  .delete(deleteSubCategory)
  .patch(updateSubCategory);
module.exports = router;
