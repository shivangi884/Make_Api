const { z } = require("zod");

const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .optional(),

    email: z.string().trim().email("Please enter a valid email").optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update profile",
  });

module.exports = {
  updateProfileSchema,
};
