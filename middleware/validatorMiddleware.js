const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validatorMiddleware = (req, res, next) => {
  // middlware for catching error in rules
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.NOT_FOUND).json({ errors: errors.array() });
  }
  next();
};
module.exports = validatorMiddleware;
