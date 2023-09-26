const { NotFoundError } = require("../errors");
const couponSchema = require("../models/coupon");
const { StatusCodes } = require("http-status-codes");
// only admin and manager can handle this
// create coupon
const createCoupon = async (req, res) => {
  const coupon = await couponSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ coupon });
};
// get all coupons
const getAllCoupons = async (req, res) => {
  const coupons = await couponSchema.find();

  res.status(StatusCodes.OK).json({ number: coupons.length, coupons });
};
// get single coupon
const getSingleCoupon = async (req, res) => {
  const couponId = req.params.id;
  const coupon = await couponSchema.findOne({ _id: couponId });
  if (!coupon) {
    throw new NotFoundError("No coupon with this ID");
  }
  res.status(StatusCodes.OK).json({ coupon });
};
// update coupon
const updateCoupon = async (req, res) => {
  const couponId = req.params.id;
  const coupon = await couponSchema.findOneAndUpdate(
    { _id: couponId },
    { ...req.body },
    { new: true }
  );
  if (!coupon) {
    throw new NotFoundError("No coupon with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Updated", coupon });
};
// delete coupon
const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;
  const coupon = await couponSchema.findOneAndDelete({ _id: couponId });
  if (!coupon) {
    throw new NotFoundError("No coupon with this ID");
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted", coupon });
};
module.exports = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
