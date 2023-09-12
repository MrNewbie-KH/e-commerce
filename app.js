// General connections
require("dotenv").config();
require("express-async-errors");
//  express connections
const path = require("path");
const express = require("express");
const app = new express();
// =============routes===========
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/subCategory");
const brandRoute = require("./routes/brand");
const productRoute = require("./routes/product");
// middlewares
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
// other packages
const connectDB = require("./db/db");
const exp = require("constants");
// working app
app.use(express.json());
app.use(express.static(path.join(__dirname, "/uploads")));
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRouter);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/product", productRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.get("/", (req, res) => {
  res.send("Welcome to E-COMMERCE application");
});
let port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
