const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const usersModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const myToken = require("../config/keys").jwtSecret;
const { check, validationResult } = require("express-validator");
// For Testing Route
// router.get("/", auth, (req, res) => res.json({ msg: "auth Works" }));

// @route   GET /auth
// @desc    Authentication
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    // console.log(`req.user.id = ${req.user.id}`);
    const user = await usersModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST auth
// @desc    Authenticat user & get token
// @access  Public
// router.post("/",  async (req, res) => {
router.post(
  "/",
  [
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // console.log(email, password);
    try {
      // see if users exist
      let user = await usersModel.findOne({ email: email });
      // console.log("users are =", user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = { user: { id: user.id } };
      jwt.sign(payload, myToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
