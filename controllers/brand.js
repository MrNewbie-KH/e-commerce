const { addDash } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const brandSchema = require("../models/brand");
const { NotFoundError } = require("../errors/index");
// ------------------------------
const createBrand = async (req, res) => {
  const { name } = req.body;
  const brand = await brandSchema.create({ name: addDash(name) });
  res.status(StatusCodes.CREATED).json({ brand });
};
// ------------------------------
const getAllBrands = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const dataToSkip = (page - 1) * limit;
  const brands = await brandSchema.find().skip(dataToSkip).limit(limit);
  res.status(200).json({ brands, numOfHits: brands.length });
};
//------------------------------
const getSingleBrand = async (req, res) => {
  const brandId = req.params.id;
  // looking for this brand by its id
  const brand = await brandSchema.findOne({ _id: brandId });
  if (!brand) {
    throw new NotFoundError("No brand with this ID");
  }
  res.status(StatusCodes.OK).json({ brand });
};
// ------------------------------
const updateBrand = async (req, res) => {
  const brandId = req.params.id;
  const { name } = req.body;
  const brand = await brandSchema.findOneAndUpdate(
    { _id: brandId },
    { name: addDash(name) },
    { new: true }
  );
  if (!brand) {
    throw new NotFoundError("No brand with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "updated successfully", brand });
};
// ------------------------------
const deleteBrand = async (req, res) => {
  const brandId = req.params.id;
  const brand = await brandSchema.findOneAndDelete({ _id: brandId });
  if (!brand) {
    throw new NotFoundError("No brand with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "deleted successfully", brand });
};
module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
