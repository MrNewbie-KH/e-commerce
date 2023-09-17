const {
  register,
  login,
  forgetPassword,
  verifyResetPassword,
  resetPassword,
} = require("../controllers/auth");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const express = require("express");
const router = express.Router();
router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);
router.route("/forget-password").post(forgetPassword);
router.route("/verify-reset-password").post(verifyResetPassword);
router.route("/reset-password").post(resetPassword);
module.exports = router;
