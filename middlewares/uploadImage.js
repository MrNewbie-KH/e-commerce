const multer = require("multer");
const { BadRequestError } = require("../errors");
const uploadSingleImage = (fieldName) => {
  // filter file
  const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new BadRequestError("File must be an image"), false);
    }
  };
  // memory call
  const multerStorage = multer.memoryStorage();
  const upload = multer({ storage: multerStorage, fileFilter: fileFilter });
  return upload.single(fieldName);
};
module.exports = uploadSingleImage;
