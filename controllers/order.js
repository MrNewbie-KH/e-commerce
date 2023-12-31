const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { StatusCodes } = require("http-status-codes");
const orderSchema = require("../models/order");
const cartSchema = require("../models/cart");
const productSchema = require("../models/product");
const { NotFoundError, BadRequestError } = require("../errors/index");

// ------------------------------
const createCashOrder = async (req, res) => {
  const user = req.user._id;
  // get cart
  const cartId = req.params.id;
  const cart = await cartSchema.findOne({ _id: cartId });
  if (!cart) {
    throw new NotFoundError("No cart with this ID");
  }
  const taxPrice = 0;
  const shippingPrice = 0;
  // calc price
  let totalOrderPrice = 0;
  if (cart.priceAfterDiscount) {
    totalOrderPrice = cart.priceAfterDiscount + taxPrice + shippingPrice;
  } else {
    totalOrderPrice = cart.totalPrice + taxPrice + shippingPrice;
  }
  // create order in cash
  const order = await orderSchema.create({
    user,
    totalOrderPrice,
    cartItems: cart.cartItems,
  });
  // play with quantity
  // handled using simple for loop
  for (let i = 0; i < cart.cartItems.length; i++) {
    const product = await productSchema.findOne({
      _id: cart.cartItems[i].product,
    });
    if (product.quantity < cart.cartItems[i].quantity) {
      throw new BadRequestError("Not enough in stock");
    }
    product.quantity -= cart.cartItems[i].quantity; // dec stock
    product.numberOfSoldItems += cart.cartItems[i].quantity; // inc sold items
    await product.save();
  }
  // NOT WORKING
  //  cart.cartItems.forEach( (item) => {
  //   const product = await productSchema.findOne({ _id: item.product });
  //   if (product.quantity < item.quantity) {
  //     return new BadRequestError("Not enough in stock");
  //   }
  //   product.quantity -= item.quantity; // dec stock
  //   product.numberOfSoldItems += item.quantity; // inc sold items
  //   await product.save();
  //   });

  // clear cart
  await cartSchema.deleteOne({ _id: cartId });
  res.status(StatusCodes.OK).json({ msg: "Pay in cash", cart });
};
// ------------------------------
const getAllOrders = async (req, res) => {
  // if simple user return all its past orders
  const user = req.user._id;
  let orders;
  if (req.user.role === "user") {
    orders = await orderSchema.find({ user });
  }
  // if Admin return all past orders
  else {
    orders = await orderSchema.find();
  }
  res.status(StatusCodes.OK).json({ numOfOrders: orders.length, orders });
};
// ------------------------------
const getSingleOrder = async (req, res) => {
  // if simple user return all its past orders
  let user = req.user._id;
  const orderId = req.params.id;
  let order;
  if (req.user.role === "admin") {
    order = await orderSchema.findOne({ _id: orderId });
  } else {
    order = await orderSchema.findOne({ _id: orderId, user });
  }

  res.status(StatusCodes.OK).json({ order });
};
// ------------------------------
const updateOrderStatusToPaid = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderSchema.findByIdAndUpdate(
    { _id: orderId },
    { isPaid: true, paidAt: Date.now() },
    { new: true }
  );
  if (!order) {
    throw new NotFoundError("No order with this ID");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated successfully to paid", order });
};
// ---------------------------
const updateOrderStatusToDelivered = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderSchema.findByIdAndUpdate(
    { _id: orderId },
    { isDelivered: true, deliveredAt: Date.now() },
    { new: true }
  );
  if (!order) {
    throw new NotFoundError("No order with this ID");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated successfully to paid", order });
};
// ---------------------------
const checkoutSession = async (req, res) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartSchema.findById(req.params.id);
  if (!cart) {
    throw new NotFoundError(`There is no such cart with id `);
  }

  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.priceAfterDiscount
    ? cart.priceAfterDiscount
    : cart.totalPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: req.user.name,
          },
          unit_amount: totalOrderPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/api/v1/order`,
    cancel_url: `${req.protocol}://${req.get("host")}/api/v1/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
  });

  res.status(StatusCodes.OK).json({ status: "success", session });
};

// ---------------------------

module.exports = {
  createCashOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatusToPaid,
  updateOrderStatusToDelivered,
  checkoutSession,
};
