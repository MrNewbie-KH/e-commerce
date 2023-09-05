require("dotenv").config({ path: "../.env" });
require("colors");
const connectDB = require("../db/db");
const productSchema = require("../models/product");
const categorySchema = require("../models/category");
const subCategorySchema = require("../models/subCategory");
const brandSchema = require("../models/brand");
const fs = require("fs");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit with an error code
  }
};

const products = JSON.parse(fs.readFileSync("./data.json"));

const insertData = async () => {
  try {
    await productSchema.create(products);
    console.log("Data inserted successfully".green);
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1); // Exit with an error code
  }
};

const deleteData = async () => {
  try {
    await productSchema.deleteMany();
    // await categorySchema.deleteMany();
    // await subCategorySchema.deleteMany();
    // await brandSchema.deleteMany();
    console.log("Data deleted successfully".red.inverse);
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Error deleting data:", error);
    process.exit(1); // Exit with an error code
  }
};

if (process.argv[2] === "-i") {
  start()
    .then(insertData)
    .catch((error) => console.error("Error:", error));
} else if (process.argv[2] === "-d") {
  start()
    .then(deleteData)
    .catch((error) => console.error("Error:", error));
} else {
  console.error("Usage: node script.js <-i for insert / -d for delete>");
}
