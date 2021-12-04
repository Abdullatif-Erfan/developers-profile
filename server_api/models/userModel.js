const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"]
  },
  email: {
    type: String,
    required: [true, "email is Required"],
    unique: [true, "email should be Unique"]
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  },
  avatar: { type: String, default: "latif.jpg" },
  date: { type: Date, default: Date.now, select: false }
});
const users = mongoose.model("users", UserSchema);
module.exports = users;
