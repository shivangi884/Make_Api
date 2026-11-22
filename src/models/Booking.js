const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USer",
      required: [true, "user is required"],
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "event is required"],
    },

    tickets: {
      type: Number,
      required: [true, "tickets is required"],
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: [true, "totalAmount is required"],
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;


// user         → kaya user e booking kari
// event        → kaya event ni booking chhe
// tickets      → ketli tickets book kari
// totalAmount  → total price
// bookingDate  → booking kyare kari
// status       → confirmed / cancelled / completed
