const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  handle: { type: String, max: [40, "Max 40 Character"] },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: [true, "status is required"] },
  skills: { type: [String], required: [true, "skills is required"] },
  bio: { type: String },
  githubusername: { type: String },

  experience: [
    {
      title: { type: String, required: [true, "experience is required"] },
      company: { type: String, required: [true, "company is required"] },
      location: { type: String },
      from: { type: Date, required: [true, "Start date is required"] },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],

  education: [
    {
      school: { type: String, required: [true, "school is required"] },
      degree: { type: String, required: [true, "degree is required"] },
      fieldofstudy: {
        type: String,
        required: [true, "Field of Study is required"]
      },
      from: { type: Date, required: [true, "Start date is required"] },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],

  social: {
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String }
  },
  date: { type: Date, default: Date.now }
});

const profiles = mongoose.model("profiles", ProfileSchema);
module.exports = profiles;
