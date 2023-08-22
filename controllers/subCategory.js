const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const subCategorySchema = require("../models/subCategory");
const { BadRequestError, NotFoundError } = require("../errors/index");
// ------------------------------
const createSubCategory = async (req, res) => {
  let { name, categoryId } = req.body;
  if (!req.body.categoryId) {
    categoryId = req.params.categoryId;
  }
  if (!name || !categoryId) {
    throw new BadRequestError("Please provide bithe name and category");
  }
  const subCategory = await subCategorySchema.create({
    name: addDash(name),
    category: categoryId,
  });
  res.status(StatusCodes.CREATED).json({ subCategory });
};
// ------------------------------
const getAllSubCategories = async (req, res) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
    console.log(filterObject);
  }
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  const subCategories = await subCategorySchema
    .find(filterObject)
    .skip(dataToSkip)
    .limit(limit);
  // .populate({ path: "category", select: "name" });
  res.status(200).json({ subCategories, numOfHits: subCategories.length });
};
//------------------------------
const getSingleSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;
  if (!subCategoryId) {
    throw new BadRequestError("Please provide Sub-category");
  }
  // looking for this subCategory by its id
  const subCategory = await subCategorySchema.findOne({ _id: subCategoryId });
  if (!subCategory) {
    throw new NotFoundError("No subCategory with this ID");
  }
  res.status(StatusCodes.OK).json({ subCategory });
};
// ------------------------------
const updateSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;
  if (!subCategoryId) {
    throw new BadRequestError("Please provide Sub-category");
  }
  const { name, categoryId } = req.body;
  const subCategory = await subCategorySchema.findOneAndUpdate(
    { _id: subCategoryId },
    { name: name || this.name, categoryId: categoryId || this.categoryId },
    { new: true }
  );
  if (!subCategory) {
    throw new NotFoundError("No subCategory with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "updated successfully", subCategory });
};
// ------------------------------
const deleteSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;
  if (!subCategoryId) {
    throw new BadRequestError("Please provide Sub-category");
  }
  const subCategory = await subCategorySchema.findOneAndDelete({
    _id: subCategoryId,
  });
  if (!subCategory) {
    throw new NotFoundError("No subCategory with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "deleted successfully", subCategory });
};
module.exports = {
  getAllSubCategories,
  getSingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
