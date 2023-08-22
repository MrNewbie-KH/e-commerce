const {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand");
const express = require("express");
const router = express.Router();
router.route("/").get(getAllBrands).post(createBrand);
router.route("/:id").get(getSingleBrand).delete(deleteBrand).patch(updateBrand);
module.exports = router;
