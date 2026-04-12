const router = require("express").Router();
const {
  getDoctors,
  applyDoctor,
  getMyAppointments,
  getMyAvailability,
  updateMyAvailability
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", getDoctors);
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("user"),
  applyDoctor
);
router.get(
  "/me/appointments",
  authMiddleware,
  roleMiddleware("doctor"),
  getMyAppointments
);
router.get(
  "/me/availability",
  authMiddleware,
  roleMiddleware("doctor"),
  getMyAvailability
);
router.put(
  "/me/availability",
  authMiddleware,
  roleMiddleware("doctor"),
  updateMyAvailability
);

module.exports = router;
