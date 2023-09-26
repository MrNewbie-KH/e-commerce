// controllers
const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  imageResize, // image processing
} = require("../controllers/category");
// validation
const {
  getCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");
// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
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
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    uploadCategoryImage,
    imageResize,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getSingleCategory)
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    deleteCategoryValidator,
    deleteCategory
  )
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    uploadCategoryImage,
    imageResize,
    updateCategoryValidator,
    updateCategory
  );
module.exports = router;
