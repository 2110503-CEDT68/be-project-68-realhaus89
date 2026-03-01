const express = require("express");
const router = express.Router();

const {
  getDentists,
  getDentist,
  createDentist,
  updateDentist,
  deleteDentist,
  addSlots,
  deleteSlot,
} = require("../controllers/dentists");

const { protect, authorize } = require("../middleware/auth.js");

// --- Public / Protected ---
// GET /api/v1/dentists (List dentists)
// GET /api/v1/dentists/:id (Get dentist + slots)
router
  .route("/")
  .get(getDentists)
  .post(protect, authorize("admin"), createDentist);

router
  .route("/:id")
  .get(getDentist)
  .put(protect, authorize("admin"), updateDentist)
  .delete(protect, authorize("admin"), deleteDentist);

// --- Admin Only (Slots Management) ---
// POST /api/v1/dentists/:id/slots (Add slots)
router.post("/:id/slots", protect, authorize("admin"), addSlots);

// DELETE /api/v1/dentists/:id/slots/:slotId (Delete slot)
router.delete("/:id/slots/:slotId", protect, authorize("admin"), deleteSlot);

module.exports = router;
