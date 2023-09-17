const {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors");
const { verifyJWTToken } = require("../utils/jwt");
const userSchema = require("../models/user");
// authentication
const authenticateMiddleware = async (req, res, next) => {
  // 1) check token exist in headers
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    throw new BadRequestError("Authentication failed");
  }
  // 2) validate the token
  const decode = token.split(" ")[1];
  const isValidToken = verifyJWTToken(decode);
  // 3) check this id of user is a valid Id and match between them
  const user = await userSchema.findOne({ _id: isValidToken.userId });
  if (!user) {
    throw new UnauthenticatedError("No user auythenticated");
  }
  // call next middleware
  req.user = user; // to be used in authorization
  next();
};
// authorization
const authorizeMiddleware =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Not allowed to access this route");
    //  access roles from parameters
    // access logged user
    next();
  };
module.exports = {
  authenticateMiddleware,
  authorizeMiddleware,
};
