const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

const generateTicket = require("../utils/generateTicket");

const createBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    if (!eventId || !tickets) {
      return res
        .status(400)
        .json({ message: "Event ID and tickets are required" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingBooking = await Booking.findOne({
      user: req.user.id,
      event: eventId,
      status: "confirmed",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this event",
      });
    }

    if (tickets > event.availableSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const totalAmount = event.price * tickets;

    const ticketNumber = generateTicket();

    const booking = await Booking.create({
      user: req.user.id,
      event: eventId,
      ticketNumber,
      tickets,
      totalAmount,
    });

    event.availableSeats = event.availableSeats - tickets;

    await event.save();

    res.status(201).json({ message: "Event booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("event")
      .populate("user", "name email");

    res
      .status(200)
      .json({ message: "Bookings fetched successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("event")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can access only your own booking" });
    }

    res.status(200).json({ message: "Booking fetched successfilly", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch booking", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingUserId = String(booking.user);
    const loggedInUserId = String(req.user.id);

    console.log("Booking User ID:", bookingUserId);
    console.log("Logged In User ID:", loggedInUserId);

    if (bookingUserId !== loggedInUserId) {
      return res
        .status(403)
        .json({ message: "You can cancel only your own booking" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    const event = await Event.findById(booking.event);

    if (event) {
      event.availableSeats += booking.tickets;
      await event.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Booking cancellation failed", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event", "title data time location price");

    res
      .status(200)
      .json({ message: "All bookings fetched successfully", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Booking status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Booking status update failed", error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
};

// createBooking,             // Create Booking - User
// getMyBookings,             // Get My Bookings - User
// getBookingById,            // Get Single Booking - User
// cancelBooking,             // Cancel Booking - User
// getAllBookings,            // Get All Bookings - Admin
// updateBookingStatus        // Update Booking Status - Admin
