// only admin can do CRUDS on user
const userSchema = require("../models/user");
const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const uploadSingleImage = require("../middlewares/uploadImage");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
// -------------------------------------
// Uploading image
const uploadUserImage = uploadSingleImage("profileImage");
const imageResize = async (req, res, next) => {
  const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile("uploads/user/" + fileName);
    req.body.profileImage = fileName;
  }
  next();
};
// -------------------------------------
const createUser = async (req, res) => {
  req.body.name = addDash(req.body.name);
  const user = await userSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
// -------------------------------------
const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userSchema.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("No user with this ID");
  }
  res.status(StatusCodes.OK).json({ user });
};
// -------------------------------------
const getAllUsers = async (req, res) => {
  const users = await userSchema.find();
  res.status(StatusCodes.OK).json({ numOfHits: users.length, users });
};
// -------------------------------------
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const dataToUpdate = { ...req.body };
  if (dataToUpdate.password) console.log(dataToUpdate);
  const user = await userSchema.findOneAndUpdate(
    { _id: userId },
    { ...dataToUpdate },
    { new: true }
  );
  if (!user) {
    throw new NotFoundError("No user with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Updated successfully", user });
};
// -------------------------------------
const updatePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  console.log(req.body);
  const user = await userSchema.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("No user with this id");
  }
  // check the old password password
  const isMatching = await user.comparePassword(currentPassword);
  if (!isMatching) {
    throw new BadRequestError("Wrong password");
  }
  // confirmation password
  if (newPassword !== confirmNewPassword) {
    throw new BadRequestError("New password and confirmation don't match");
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ updatedUser: user });
};
// -------------------------------------
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userSchema.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("No user with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted successfully", user });
};
// -------------------------------------
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  imageResize,
  updatePassword,
};
