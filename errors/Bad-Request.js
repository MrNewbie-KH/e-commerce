const { StatusCodes } = require("http-status-codes");
const CustomError = require("./Custom-Error");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
