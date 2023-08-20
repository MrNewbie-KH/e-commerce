const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("Data base is connected");
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
