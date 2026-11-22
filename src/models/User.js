const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },

    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "password is require"],
    },

    role: {
      type: String,
      required: [true, "role is required"],
      default: "User",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userScheme);

module.exports = User;
