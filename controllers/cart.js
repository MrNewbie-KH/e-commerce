const { StatusCodes } = require("http-status-codes");
const cartSchema = require("../models/cart");
const productSchema = require("../models/product");
const couponSchema = require("../models/coupon");
const { NotFoundError, BadRequestError } = require("../errors");
// total price calculation
const calcTotalPrice = function (cart) {
  let total = 0;
  cart.cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  cart.priceAfterDiscount = undefined;
  cart.totalPrice = total;
};
const addProductToCart = async (req, res) => {
  const { productId, color } = req.body;
  const product = await productSchema.findOne({ _id: productId });
  // check product existance
  if (!product) {
    throw new NotFoundError("No product with this ID");
  }
  let cart = await cartSchema.findOne({ user: req.user._id });
  // 1) if no cart create cart
  if (!cart) {
    cart = await cartSchema.create({
      cartItems: [
        {
          product: productId,
          color,
          price: product.price,
        },
      ],

      user: req.user._id,
    });
  }
  // 2) if there is a cart
  else {
    const productIndex = cart.cartItems.findIndex((item) => {
      return item.product.toString() === productId && item.color === color;
    });
    // product exists quantity ++
    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += 1;
    }
    // not this product then push it to the cart
    else {
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }
  // 3) calculate total cart price
  calcTotalPrice(cart);
  await cart.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "product added successfully to cart", cart });
};
const getUserCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await cartSchema.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("No cart for this User");
  }
  cart.priceAfterDiscount = undefined;
  res.status(StatusCodes.OK).json({ Items: cart.cartItems.length, cart });
};
const removeItem = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user._id;
  const cart = await cartSchema.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("No cart with this user");
  }
  const itemIndex = cart.cartItems.findIndex((item) => {
    return item._id.toString() === itemId;
  });
  cart.cartItems.splice(itemIndex, 1);
  // 3) calculate total cart price and update
  calcTotalPrice(cart);
  await cart.save();

  res.status(StatusCodes.OK).json({ msg: "deleted Item", cart });
};
const updateQuantity = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user._id;
  const q = req.body.quantity;
  const cart = await cartSchema.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("No cart with this user");
  }
  const itemIndex = cart.cartItems.findIndex((item) => {
    return item._id.toString() === itemId;
  });
  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity = req.body.quantity;
    calcTotalPrice(cart);
    await cart.save();
  } else {
    throw new NotFoundError("No Item with this id in cart");
  }
  res.status(StatusCodes.OK).json({ msg: "Quantity Updated", cart });
};
const clearCartItem = async (req, res) => {
  const userId = req.user._id;
  const cart = await cartSchema.findOneAndDelete({ user: userId });
  if (!cart) {
    throw new NotFoundError("No cart with this user");
  }
  res.status(StatusCodes.OK).json({ msg: "delete cart Item" });
};
const applyCoupon = async (req, res) => {
  const userId = req.user._id;
  const couponCode = req.body.couponCode;
  const cart = await cartSchema.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError("No cart with this user");
  }
  const coupon = await couponSchema.findOne({
    name: couponCode,
    expire: { $gt: Date.now() },
  });
  if (!coupon) {
    throw new NotFoundError("Invalid coupon code");
  } else {
    // calculate after discount
    const discount = coupon.discount;
    cart.priceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * discount) / 100;

    await cart.save();
  }
  res.status(StatusCodes.OK).json({ msg: "coupon applied successfully", cart });
};
module.exports = {
  addProductToCart,
  getUserCart,
  removeItem,
  clearCartItem,
  updateQuantity,
  applyCoupon,
};
