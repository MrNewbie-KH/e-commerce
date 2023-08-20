// General connections
require("dotenv").config();
require("express-async-errors");
//  express connections
const express = require("express");
const app = new express();
// routes
const categotyRouter = require("./routes/category");
// middlewares
// errors
// other packages
const connectDB = require("./db/db");
// working app
app.use(express.json());
app.use("/api/v1/category", categotyRouter);
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
