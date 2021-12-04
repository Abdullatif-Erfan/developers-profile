const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.testController = async (req, res) => {
  res.json({ msg: "Post Works" });
};

// @route   POST /posts
// @desc    Create new post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET /posts
// @desc    Get all profiles
// @access  Private
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // order by date DESC
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET /posts/:id
// @desc    Get all profiles
// @access  Private
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   GET /posts/:id
// @desc    Delete post by ID
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Check the user
    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "User not Authorized" });
    }
    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT /posts/like/:id
// @desc    Like a post
// @access  Private
exports.likePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   PUT /posts/unlike/:id
// @desc    unLike a post
// @access  Private
exports.unlikePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // GET remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   POST /posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
exports.insertComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.post_id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE /posts/comment/:post_id/:com_id
// @desc    Delete comment
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // Pull out comment
    const comment = post.comments.find(comm => comm.id === req.params.com_id);
    // Make sure comments exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist " });
    }

    // Check user authorization
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized " });
    }

    // GET remove index
    const removeIndex = post.comments
      .map(comm => comm.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
