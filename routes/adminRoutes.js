const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getAllUsers,
  getAllAppointments,
  updateUserRole,
  getSystemStats
} = require("../controllers/adminController");

router.get(
  "/doctors/pending",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingDoctors
);

router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveDoctor
);
router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("admin"),
  rejectDoctor
);

// Read-only endpoints for MVP admin dashboard.
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);
router.get(
  "/appointments",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAppointments
);
router.put(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getSystemStats
);

module.exports = router;

