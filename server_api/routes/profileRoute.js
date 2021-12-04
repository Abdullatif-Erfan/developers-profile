const express = require("express");
const profileController = require("../controllers/profileController");
const router = express.Router();
const auth = require("../config/auth");

router.route("/test").get(profileController.testController);
router.route("/me").get(auth, profileController.getCurrentProfile);
router.route("/").post(auth, profileController.createOrUpdateProfile);
router.route("/all").get(profileController.getAllProfiles);
router.route("/user/:user_id").get(profileController.getUserProfile);
router.route("/").delete(auth, profileController.deleteUserProfilePosts);

router.route("/experience").put(auth, profileController.createExperience);
router
  .route("/experience/:exp_id")
  .delete(auth, profileController.deleteExperience);

router.route("/education").put(auth, profileController.createEducation);
router
  .route("/education/:edu_id")
  .delete(auth, profileController.deleteEducation);

module.exports = router;
