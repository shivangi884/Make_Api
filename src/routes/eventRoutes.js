const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { validate } = require("../middleware/validationMiddleware");

const {
  createEventSchema,
  updateEventSchema,
} = require("../validations/eventSchemas");

const router = express.Router();

// Get all events - Public
router.get("/", getAllEvents);

// Get single event - Public
router.get("/:id", getEventById);

// Create event - Admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createEventSchema),
  createEvent,
);

// Update event - Admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateEventSchema),
  updateEvent,
);

// Delete event - Admin only
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;
