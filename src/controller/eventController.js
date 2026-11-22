const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      date,
      time,
      location,
      price,
      totalSeats,
      availableSeats,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !image ||
      !date ||
      !time ||
      !location ||
      !price ||
      !totalSeats ||
      !availableSeats
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      category,
      image,
      date,
      time,
      location,
      price,
      totalSeats,
      availableSeats,
      organizer: req.user.id,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Event creation failed", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("category")
      .populate("organizer", "name email");

    res.status(200).json({ message: "Event fetched successfully", events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("category")
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event fetched successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // req.params.id request ni andar tame mokleli actual data // req.body URL mathi aavta values

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Event update failed", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Event deleted failed", error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};

// createEvent,         // Create Event - Admin
// getAllEvents,        // Get All Events
// getEventById,        // Get Single Event
// updateEvent,         // Update Event
// deleteEvent,         // Delete Event
