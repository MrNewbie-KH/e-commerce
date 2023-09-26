const BadRequestError = require("./Bad-Request");
const NotFoundError = require("./Not-Found");
const UnauthorizedError = require("./Un-Authorized");
const UnauthenticatedError = require("./Un-authenticated");
const CustomError = require("./Custom-Error");

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
