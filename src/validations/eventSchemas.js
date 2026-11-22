const { z } = require("zod");

const eventBaseSchema = z
  .object({
    title: z.string().trim().min(1, "Event title is required"),

    description: z.string().trim().min(1, "Event description is required"),

    category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),

    image: z.string().trim().min(1, "Event image is required"),

    date: z.coerce.date(),

    time: z.string().trim().min(1, "Event time is required"),

    location: z.string().trim().min(1, "Event location is required"),

    price: z.number().min(0, "Price cannot be negative"),

    totalSeats: z.number().int().min(1, "At least one seat is required"),

    availableSeats: z
      .number()
      .int()
      .min(0, "Available seats cannot be negative"),
  })
  .strict();

const createEventSchema = eventBaseSchema.refine(
  (data) => data.availableSeats <= data.totalSeats,
  {
    message: "Available seats cannot exceed total seats",
    path: ["availableSeats"],
  },
);

const updateEventSchema = eventBaseSchema
  .partial()
  .extend({
    status: z
      .enum(["upcoming", "ongoing", "completed", "cancelled"])
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update event",
  })
  .refine(
    (data) =>
      data.totalSeats === undefined ||
      data.availableSeats === undefined ||
      data.availableSeats <= data.totalSeats,
    {
      message: "Available seats cannot exceed total seats",
      path: ["availableSeats"],
    },
  );

module.exports = {
  createEventSchema,
  updateEventSchema,
};
