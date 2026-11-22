const { z } = require("zod");

const createBookingSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID"),

  tickets: z
    .number()
    .int("Tickets must be a whole number")
    .min(1, "At least one ticket is required"),
});

const updateBookingStatusSchema = z.object({
  status: z.enum(["confirmed", "cancelled", "completed"], {
    message: "Invalid booking status",
  }),
});

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema,
};
