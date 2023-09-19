const { addDash, removeChar } = require("../utils/generalFunctions");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");
const ApiFeatures = require("../utils/apiFeatures");
const productSchema = require("../models/product");
const categorySchema = require("../models/category");
const subCategorySchema = require("../models/subCategory");
const product = require("../models/product");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
// ------------------------------
// handling image upload
const multerFilter = function (req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new BadRequestError("File must be an image"), true);
  }
};
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadImages = upload.fields([
  {
    name: "coverImage",
    maxCount: 1,
  },
  { name: "images", maxCount: 5 },
]);
// handling Image resize
const imageResize = async function (req, res, next) {
  // console.log(req.files);
  // image processing for image cover
  if (req.files.coverImage) {
    const fileName = `product-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.coverImage[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile("uploads/product/" + fileName);
    req.body.coverImage = fileName;
  }
  // image processing for array of images
  if (req.files.images) {
    const images = [];
    await Promise.all(
      req.files.images.map(async (image) => {
        const fileName = `product-${uuidv4()}-${Date.now()}.jpeg`;
        await sharp(image.buffer)
          .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile("uploads/product/" + fileName);
        images.push(fileName);
      })
    );
    console.log(images); // not working as it is not waiting for the forEach to end first
    // after adding promise.all it will wait for it
    req.body.images = images;
  }
  next();
};

// ------------------------------
const createProduct = async (req, res) => {
  req.body.title = addDash(req.body.title);
  const { subCategory } = req.body;
  let ctr = 0;
  if (subCategory) ctr = subCategory.length;
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
  // build query
  const allDocs = await product.countDocuments();
  let apiFeatures = new ApiFeatures(productSchema.find(), req.query);
  apiFeatures = apiFeatures
    .filter()
    .limitFields()
    .paginate(allDocs)
    .search()
    .sort();
  // execute query
  const products = await apiFeatures.mongooseQuery;
  res.status(200).json({
    numOfHits: products.length,
    paginationResults: apiFeatures.paginationResults,
    products,
  });
};
// ------------------------------
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await productSchema
    .findOne({ _id: productId })
    .populate("reviews");
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
  imageResize,
  uploadImages,
};
