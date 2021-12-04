const empModel = require("./../models/empModel");
const APIFeatures = require("./../utils/apiFeatures");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const myToken = require("../config/keys").jwtSecret;

exports.createEmployee = async (req, res) => {
  try {
    const tokenId = "";
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = encPassword;
    const newEmp = await empModel.create(req.body);
    res.status(200).json({
      status: "Successfully Inserted",
      data: {
        record: newEmp
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err
      // message: "Invalid data sent"
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  //   res.json({ msg: "getAllEmployees Works" });
  try {
    const features = new APIFeatures(empModel.find(), req.query)
      .filter()
      .sorts()
      .limitFields()
      .paginate();
    const empData = await features.query;

    res.status(201).json({
      status: "Success",
      totals: empData.length,
      data: {
        records: empData
      }
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const empData = await empModel.findById(req.params.id);
    //    empModel.findOne(_id:req.params.id)
    res.status(202).json({
      status: "Success",
      data: {
        record: empData
      }
    });
  } catch (err) {
    res.status(402).json({
      status: "failed",
      message: err
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const encPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = encPassword;
    }
    const empData = await empModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(203).json({
      status: "Successfully Updated",
      data: {
        record: empData
      }
    });
  } catch (err) {
    res.status(403).json({
      status: "failed",
      message: err
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await empModel.findByIdAndDelete(req.params.id);
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
