const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const categorySchema = require("../models/category");
const ApiFeatures = require("../utils/apiFeatures");
const { NotFoundError } = require("../errors/index");
// ------------------------------
const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categorySchema.create({ name: addDash(name) });
  res.status(StatusCodes.CREATED).json({ category });
};
// ------------------------------
const getAllCategories = async (req, res) => {
  // build query
  const allDocs = await categorySchema.countDocuments();
  let apiFeatures = new ApiFeatures(categorySchema.find(), req.query);
  apiFeatures = apiFeatures
    .filter()
    .limitFields()
    .paginate(allDocs)
    .search()
    .sort();
  // execute query
  const categories = await apiFeatures.mongooseQuery;
  res.status(200).json({
    numOfHits: categories.length,
    paginationResults: apiFeatures.paginationResults,
    categories,
  });
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
};
