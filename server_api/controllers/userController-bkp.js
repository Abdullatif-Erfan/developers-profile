const usersModel = require("./../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await usersModel.create(req.body);
    res.status(200).json({
      status: "Successfully Inserted",
      data: {
        record: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      //   message: err
      message: "Invalid data sent"
    });
  }
};

// exports.getAllUsers = async (req, res) => {
//   try {
//     const usersData = await usersModel.find();
//     res.status(201).json({
//       status: "Success",
//       totals: usersData.length,
//       data: {
//         records: usersData
//       }
//     });
//   } catch (err) {
//     res.status(401).json({
//       status: "failed",
//       message: err
//     });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.query);
    // const usersData = await usersModel.find({
    //   name: "Erfan 4",
    //   email: "erfan4@gmail.com"
    // });

    // const usersData = await usersModel
    //   .find()
    //   .where("name")
    //   .equals("Erfan 4")
    //   .where("email")
    //   .equals("erfan4@gmail.com");
    // console.log(req.query);
    // const usersData = await usersModel.find(req.query);

    // 1)Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);
    // console.log(req.query,queryObj);

    // 2)  Advanced Filtering
    // { name: 'Erfan', age: { $gte: 30 } }
    // { name: 'Erfan', age: { gte: 30 } }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    // 3) BUILD QUERY
    let query = usersModel.find(JSON.parse(queryStr));

    // 4) Sorting
    if (req.query.sort) {
      // sort(price,age)
      //   const sortBy = req.query.sort.split(",").json(" ");
      //   console.log(sortBy);
      //   query = query.sort(sortBy);
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("createdAt"); // order DESC
    }

    // 5) Field Limiting or Excluding
    if (req.query.fields) {
      const fields = req.query.fields.split(",").json(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 6) Pagination //http://localhost:5000/users?page=2&limit=5
    const page = req.query.page * 1 || 1; //multiply by one change string to number, || 1 = default value=1
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=3&limit=10, page1=1-10, p2=11-20, p3=21-30
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const totalRecords = await usersModel.countDocuments();
      if (skip >= totalRecords) throw new Error("This page does not exist");
    }

    // EXECUTE QUERY
    const usersData = await query;

    // SEND RESPONSE
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
