const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

exports.testController = async (req, res) => {
  res.json({ msg: "Profile Works" });
};

// @route   GET profile/me
// @desc    Get current users profile
// @access  Private
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(404).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    res.status(403).json({
      status: "failed",
      message: err
    });
  }
};

// @route   POST profile
// @desc    Get current users profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;
  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  // console.log(profileFields.user);
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map(skill => skill.trim());
  }

  // Build Social Object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  // console.log(profileFields);
  try {
    profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        // { $set: req.body },
        { $set: profileFields },
        { new: true }
      );
      res.status(200).json({
        status: "Successfully Updated",
        data: {
          record: profile
        }
      });
    } else {
      // Create new profile
      const newRecord = await Profile.create(profileFields);
      res.status(200).json({
        status: "Successfully Inserted",
        data: {
          record: newRecord
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET profile/all
// @desc    Get all profiles
// @access  Public
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};

// @route   GET profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(404).send("Server Error");
  }
};

// @route   DELETE profile
// @desc    Delete profile, user account and posts
// @access  Private
exports.deleteUserProfilePosts = async (req, res) => {
  try {
    // Delete all posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User account
    await User.findOneAndRemove({ _id: req.user.id });

    res.send({ msg: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};

// @route   PUT profile/experience
// @desc    Add profile experience
// @access  Private
exports.createExperience = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};

// @route   DELETE profile/experience/:exp_id
// @desc    Delete Experience from profile
// @access  Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Index to remove
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};

// @route   PUT profile/Education
// @desc    Add profile Education
// @access  Private
exports.createEducation = async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};

// @route   DELETE profile/ducation/:edu_id
// @desc    Delete education from profile
// @access  Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Index to remove
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(404).send("Server Error");
  }
};
