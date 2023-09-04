const {
  addDash,
  validateArrayOfExistance,
} = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors/index");
const productSchema = require("../models/product");
const categorySchema = require("../models/category");
const subCategorySchema = require("../models/subCategory");
// ------------------------------
const createProduct = async (req, res) => {
  req.body.title = addDash(req.body.title);
  const { subCategory } = req.body;
  let ctr = subCategory.length;
  // validation if category exists
  const category = await categorySchema.findOne({ _id: req.body.category });
  if (!category) {
    throw new NotFoundError("No category with this ID");
  }
  // validation sub-category exists
  while (ctr) {
    const sub = await subCategorySchema.findOne({
      _id: req.body.subCategory[ctr - 1],
      category,
    });
    if (!sub) {
      throw new NotFoundError(
        "No subcategory with this id or not encluded in the category"
      );
    }
    ctr--;
  }
  // validate subcategory is part of category
  const product = await productSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
// ------------------------------
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await productSchema.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError("No Product with this ID");
  }
  res.status(StatusCodes.OK).json({ product });
};
// ------------------------------
const getAllProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  const products = await productSchema.find().skip(dataToSkip).limit(limit);
  res.status(200).json({ products, numOfHits: products.length });
};
// ------------------------------
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await productSchema.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true }
  );
  if (!product) {
    throw new NotFoundError("No product with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "updated successfully", product });
};
// ------------------------------
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await productSchema.findOneAndDelete({ _id: productId });
  if (!product) {
    throw new NotFoundError("No product with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "deleted successfully", product });
};
// ------------------------------
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
