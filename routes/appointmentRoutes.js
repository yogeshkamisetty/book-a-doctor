const router = require("express").Router();
const {
  book,
  getAppointments
} = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/book", authMiddleware, roleMiddleware("user", "doctor"), book);
router.get(
  "/",
  authMiddleware,
  roleMiddleware("user", "doctor", "admin"),
  getAppointments
);

module.exports = router;
