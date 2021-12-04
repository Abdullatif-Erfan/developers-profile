const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const auth = require("../config/auth");

// Post
router
  .route("/")
  .get(auth, postController.getPost)
  .post(auth, postController.createPost);
router
  .route("/:id")
  .get(auth, postController.getPostById)
  .delete(auth, postController.deletePost);

// Like
router.route("/like/:id").put(auth, postController.likePosts);
router.route("/unlike/:id").put(auth, postController.unlikePosts);

// Comment
router.route("/comment/:post_id").post(auth, postController.insertComment);
router
  .route("/comment/:post_id/:com_id")
  .delete(auth, postController.deleteComment);

module.exports = router;
