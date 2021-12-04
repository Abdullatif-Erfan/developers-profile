const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const user = require("./../../models/userModel");

const app = express();

// DB Config
const db = require("./../../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/db_backup.json`, "utf-8")
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await user.create(users);
    console.log("Data Successfully Loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await user.deleteMany();
    console.log("Data Successfully Deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// lets test
// cd .\react\server\ node .\dev-data\data\import-dev-data.js
// console.log(process.argv);

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// Run
// node dev-data/data/import-dev-data.js
// node dev-data/data/import-dev-data.js --delete
// node dev-data/data/import-dev-data.js --import
