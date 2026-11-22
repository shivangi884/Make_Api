const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controller/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { validate } = require("../middleware/validationMiddleware");

const {
  createBookingSchema,
  updateBookingStatusSchema,
} = require("../validations/bookingSchemas");

const router = express.Router();

// Create Booking - User
router.post("/", authMiddleware, validate(createBookingSchema), createBooking);

// Get My Bookings - User
router.get("/my-bookings", authMiddleware, getMyBookings);

// Get All Bookings - Admin
router.get("/admin/all", authMiddleware, adminMiddleware, getAllBookings);

// Update Booking Status - Admin
router.put(
  "/admin/:id/status",
  authMiddleware,
  adminMiddleware,
  validate(updateBookingStatusSchema),
  updateBookingStatus,
);

// Get Single Booking - User
router.get("/:id", authMiddleware, getBookingById);

// Cancel Booking - User
router.put("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;
