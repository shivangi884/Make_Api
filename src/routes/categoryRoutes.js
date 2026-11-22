const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { validate } = require("../middleware/validationMiddleware");

const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validations/categorySchemas");

const router = express.Router();

// Get all categories - Public
router.get("/", getAllCategories);

// Get single category - Public
router.get("/:id", getCategoryById);

// Create category - Admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createCategorySchema),
  createCategory,
);

// Update category - Admin only
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateCategorySchema),
  updateCategory,
);

// Delete category - Admin only
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
