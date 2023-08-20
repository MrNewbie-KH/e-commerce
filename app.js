require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const app = new express();
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
