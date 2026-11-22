const mongoose = require("mongoose");

const categoryScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: [true,"Description is required"],
    },

    image: {
      type: String,
    },
  },
  {
    timeStamps: true,
  },
);

const Category = mongoose.model("Category", categoryScheme);

module.exports = Category;

// Aa pachi category example:
// Music
// Sports
// Business
// Technology
// Workshop
// Entertainment
