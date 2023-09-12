const { addDash } = require("../utils/generalFunctions");
const uploadSingleImage = require("../middlewares/uploadImage");
const { StatusCodes } = require("http-status-codes");
const categorySchema = require("../models/category");
const { NotFoundError, BadRequestError } = require("../errors/index");
// const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
/* multer disk storage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/category");
//   },
//   filename: function (req, file, callback) {
//     // file extension extraction
//     const fileExtension = file.mimetype.split("/")[1];
//     // create unique name
//     const uniqueName = `categoty-${uuidv4()}-${Date.now()}.${fileExtension}`;
//     callback(null, uniqueName);
//   },
// });
*/
/* multer filter

// const multerFilter = function (req, file, callback) {
//   if (file.mimetype.startsWith("image")) {
//     callback(null, true);
//   } else {
//     callback(new BadRequestError("Type must be an image"), false);
//   }
// };
*/
/* multer memory storage
const multerStorage = multer.memoryStorage();
*/
// image resize with sharp
const imageResize = async (req, res, next) => {
  const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile("uploads/category/" + fileName);
  // identifying image
  req.body.image = fileName;
  next();
};
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadCategoryImage = uploadSingleImage("image");
// ------------------------------
const createCategory = async (req, res) => {
  const { name, image } = req.body;
  const category = await categorySchema.create({
    name: addDash(name),
    image,
  });
  res.status(StatusCodes.CREATED).json({ category });
};
// ------------------------------
const getAllCategories = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  const categories = await categorySchema.find().skip(dataToSkip).limit(limit);
  res.status(200).json({ categories, numOfHits: categories.length });
};
//------------------------------
const getSingleCategory = async (req, res) => {
  const categoryId = req.params.id;
  // looking for this category by its id
  const category = await categorySchema.findOne({ _id: categoryId });
  if (!category) {
    throw new NotFoundError("No category with this ID");
  }
  res.status(StatusCodes.OK).json({ category });
};
// ------------------------------
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  const category = await categorySchema.findOneAndUpdate(
    { _id: categoryId },
    { name },
    { new: true }
  );
  if (!category) {
    throw new NotFoundError("No category with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "updated successfully", category });
};
// ------------------------------
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await categorySchema.findOneAndDelete({ _id: categoryId });
  if (!category) {
    throw new NotFoundError("No category with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "deleted successfully", category });
};
module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  imageResize,
};
