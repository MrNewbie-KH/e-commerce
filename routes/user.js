// require controllers
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  imageResize,
  updatePassword,
} = require("../controllers/user");
// require validators
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updatePasswordValidator,
} = require("../utils/validators/userValidator");
// middlewares
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
router.patch("/change-password/:id", updatePasswordValidator, updatePassword);
router
  .route("/")
  .get(authenticateMiddleware, authorizeMiddleware("admin"), getAllUsers)
  .post(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    uploadUserImage,
    imageResize,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    getUserValidator,
    getSingleUser
  )
  .patch(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    updateUserValidator,
    updateUser
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware("admin"),
    deleteUserValidator,
    deleteUser
  );
module.exports = router;
