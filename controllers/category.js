const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const categorySchema = require("../models/category");
// ------------------------------
const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categorySchema.create({ name: addDash(name) });
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
  res.status(StatusCodes.OK).json({ msg: "updated successfully", category });
};
// ------------------------------
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await categorySchema.findOneAndDelete({ _id: categoryId });
  res.status(StatusCodes.OK).json({ msg: "deleted successfully", category });
};
module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
