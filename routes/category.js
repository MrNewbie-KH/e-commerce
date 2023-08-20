const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const express = require("express");
const router = express.Router();
router.route("/").get(getAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .delete(deleteCategory)
  .patch(updateCategory);
module.exports = router;
