const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const categorySchema = require("../models/category");
const { NotFoundError, BadRequestError } = require("../errors/index");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
// ------------------------------
// multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/category");
  },
  filename: function (req, file, callback) {
    // file extension extraction
    const fileExtension = file.mimetype.split("/")[1];
    // create unique name
    const uniqueName = `categoty-${uuidv4()}-${Date.now()}.${fileExtension}`;
    callback(null, uniqueName);
  },
});
const multerFilter = function (req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new BadRequestError("Type must be an image"), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadCategoryImage = upload.single("image");
// ------------------------------
const createCategory = async (req, res) => {
  const { name, image } = req.body;
  const category = await categorySchema.create({
    name: addDash(name),
    image: req.file.filename,
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
};
