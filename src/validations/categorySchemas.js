const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),

  description: z.string().trim().optional(),

  image: z.string().trim().optional(),
});

const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1, "Category name cannot be empty").optional(),

    description: z.string().trim().optional(),

    image: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update category",
  });

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
