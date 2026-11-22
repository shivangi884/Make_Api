const express = require("express");

const {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controller/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { validate } = require("../middleware/validationMiddleware");

const { updateProfileSchema } = require("../validations/userSchemas");

const router = express.Router();

// Get My Profile - User
router.get("/profile", authMiddleware, getMyProfile);

// Update My Profile - User
router.put(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  updateMyProfile,
);

// Get All Users - Admin
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// Get Single User - Admin
router.get("/:id", authMiddleware, adminMiddleware, getUserById);

// Delete User - Admin
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
