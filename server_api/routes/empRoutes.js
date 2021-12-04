const express = require("express");
const empController = require("./../controllers/empController");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("UserRoute Test");
// });

router
  .route("/")
  .get(empController.getAllEmployees)
  .post(empController.createEmployee);

router
  .route("/:id")
  .get(empController.getEmployee)
  .patch(empController.updateEmployee)
  .delete(empController.deleteEmployee);

module.exports = router;
