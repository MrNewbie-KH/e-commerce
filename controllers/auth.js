const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const userSchema = require("../models/user");
const { NotFoundError, BadRequestError } = require("../errors");
const { createJWTToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmails");
// registration
const register = async (req, res) => {
  //  Create user
  const { name, email, password } = req.body;
  const user = await userSchema.create({ name, email, password });
  // Create token
  const token = createJWTToken(user);
  // res data
  res.status(StatusCodes.CREATED).json({ token, user });
};
// login
const login = async (req, res) => {
  // get password and email
  const { email, password } = req.body;
  // check for email exist and password
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new NotFoundError("No user with this email");
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new BadRequestError("Wrong password");
  }
  // create token
  const token = createJWTToken(user);
  // send response
  res.status(StatusCodes.OK).json({ token, user });
};
// send forget password mail
const forgetPassword = async (req, res) => {
  // check user with email
  const { email } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new NotFoundError("No user with this Email");
  }
  // generate random code with this 6 digits
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // reset password hashed
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");
  user.resetCode = hashedResetCode;
  // password reset expiresIn
  user.resetExpireDate = Date.now() + 1000 * 5 * 60;
  // password reset verified
  user.resetCodeVerify = false;
  await user.save();
  // send Email
  const text = `Hello, ${user.name}
  This email to reset your Password
  Please enter the code ${code}
  E-commerce team `;
  try {
    await sendEmail({
      subject: "Reset password",
      to: "mkhattab369@gmail.com",
      text,
    });
  } catch (error) {
    user.resetCode = undefined;
    user.resetExpireDate = undefined;
    user.resetCodeVerify = undefined;
    throw new BadRequestError("Error sending email");
  }

  res.status(StatusCodes.OK).json({ msg: "Email sent" });
};
// verify code for reset password
const verifyResetPassword = async (req, res) => {
  let { resetCode, email } = req.body;
  resetCode = crypto.createHash("sha256").update(resetCode).digest("hex");
  const user = await userSchema.findOne({
    resetCode,
    email,
    resetExpireDate: { $gt: Date.now() },
  });
  if (!user) {
    throw new NotFoundError("Invalid reset code or expired");
  }
  // const isExpired = user.resetExpireDate > Date.now();
  user.resetCodeVerify = true;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success" });
};
const resetPassword = async (req, res) => {
  // get user by email
  const email = req.body.email;
  const user = await userSchema.findOne({ email });
  if (!user) {
    throw new NotFoundError("No user with this Email");
  }
  // check his reset code verify property
  if (!user.resetCodeVerify) {
    throw new BadRequestError("No access");
  }
  // take new password and save to db
  user.password = req.body.password;
  // remove all
  user.resetCode = undefined;
  user.resetExpireDate = undefined;
  user.resetCodeVerify = undefined;
  await user.save();
  const token = createJWTToken(user);
  res
    .status(StatusCodes.OK)
    .json({ token, msg: "Password changed successfully " });
};

module.exports = {
  register,
  login,
  forgetPassword,
  verifyResetPassword,
  resetPassword,
};
