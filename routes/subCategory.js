// controllers
const {
  getAllSubCategories,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryId,
} = require("../controllers/subCategory");
// validation
const {
  createSubCategotyValidator,
  getSubCategotyValidator,
  updateSubCategotyValidator,
  deleteSubCategotyValidator,
} = require("../utils/validators/subCategoryValidator");
// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
// allowing access parameters in different routes
const express = require("express");
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(getAllSubCategories)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    setCategoryId,
    createSubCategotyValidator,
    createSubCategory
  );
router
  .route("/:id")
  .get(getSubCategotyValidator, getSingleSubCategory)
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    deleteSubCategotyValidator,
    deleteSubCategory
  )
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    updateSubCategotyValidator,
    updateSubCategory
  );
module.exports = router;
