const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    time: {
      type: String,
      required: [true, "Time is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    totalSeats: {
      type: Number,
      required: [true, "TotalSeats is required"],
    },

    availableSeats: {
      type: Number,
      required: [true, "availableSeats is required"],
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "organizer is required"],
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
