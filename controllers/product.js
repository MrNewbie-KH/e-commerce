const { addDash, removeChar } = require("../utils/generalFunctions");
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
  // validate subcategory is part of category
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
  const product = await productSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
// ------------------------------
const getAllProducts = async (req, res) => {
  // 1-filtering
  const queryFilter = { ...req.query };
  const excludeFromFilters = ["limit", "page", "sort", "fields"];
  excludeFromFilters.forEach((filter) => delete queryFilter[filter]);
  // to remove > < <= >= and add $
  let queryStr = JSON.stringify(queryFilter);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (matchElement) => `$${matchElement}`
  );
  queryStr = JSON.parse(queryStr);
  // 2-pagination
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  let mongooseQuery = productSchema
    .find(queryStr)
    .limit(limit)
    .skip(dataToSkip);
  // 3-sort
  let sort = "";
  if (req.query.sort) {
    sort = removeChar(req.query.sort, ",");
    console.log(sort);
  } else {
    sort = "createdAt";
  }
  mongooseQuery = mongooseQuery.sort(sort);
  // 4-apply some fields only to work "Limit fields"
  let fields = "";
  if (req.query.fields) {
    fields = removeChar(fields, ",");
  } else {
    fields = "-__v";
  }
  mongooseQuery = mongooseQuery.select(fields);
  // 5-searching keyword in title or description
  const query = {};
  if (req.query.keyword) {
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    console.log(query);
  }
  mongooseQuery = mongooseQuery.find(query);
  // 6-call
  // const data = await productSchema
  //   .find(queryStr)
  //   .limit(limit)
  //   .skip(dataToSkip)
  //   .sort(sort)
  //   .select(fields)
  //   .find(query);
  const products = await mongooseQuery;
  res.status(200).json({ products, numOfHits: products.length });
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
