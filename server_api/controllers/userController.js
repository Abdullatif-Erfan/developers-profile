const usersModel = require("./../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const myToken = require("../config/keys").jwtSecret;

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // see if users exist
    let user = await usersModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Get users gravator
    // const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    user = new usersModel({ name, email, password });

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // return jsonwebtoken
    // res.send({ msg: "User registered" });
    const payload = { user: { id: user.id } };
    jwt.sign(payload, myToken, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeatures(usersModel.find(), req.query)
      .filter()
      .sorts()
      .limitFields()
      .paginate();
    const usersData = await features.query;

    res.status(201).json({
      status: "Success",
      totals: usersData.length,
      data: {
        records: usersData
      }
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userData = await usersModel.findById(req.params.id);
    //    usersModel.findOne(_id:req.params.id)
    res.status(202).json({
      status: "Success",
      data: {
        record: userData
      }
    });
  } catch (err) {
    res.status(402).json({
      status: "failed",
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const encPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = encPassword;
    }
    const userData = await usersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.status(203).json({
      status: "Successfully Updated",
      data: {
        record: userData
      }
    });
  } catch (err) {
    res.status(403).json({
      status: "failed",
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await usersModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Successfully Deleted",
      data: {
        record: null
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};
