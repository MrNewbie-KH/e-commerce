const jwt = require("jsonwebtoken");
// create token function
const createJWTToken = function (payload) {
  const token = jwt.sign({ userId: payload._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return token;
};
// verify token function
const verifyJWTToken = function (token) {
  const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
  return isValidToken;
};
module.exports = {
  createJWTToken,
  verifyJWTToken,
};
