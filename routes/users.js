const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  changePassword,
} = require("../controllers/users");

const { protect, authorize } = require("../middleware/auth");

// --- Own Profile Routes (User & Admin) ---
// @route   GET /api/v1/users/me/profile
// @route   PUT /api/v1/users/me/profile
router
  .route("/me/profile")
  .get(protect, getMyProfile)
  .put(protect, updateMyProfile);

// @route   PUT /api/v1/users/me/password
router.put("/me/password", protect, changePassword);

// --- Admin Only Routes ---
// @route   GET /api/v1/users
router.get("/", protect, authorize("admin"), getUsers);

// @route   GET /api/v1/users/:id
// @route   PUT /api/v1/users/:id
// @route   DELETE /api/v1/users/:id
router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
