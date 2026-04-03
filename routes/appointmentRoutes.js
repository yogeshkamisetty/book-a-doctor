const router = require("express").Router();
const {
  book,
  getAppointments
} = require("../controllers/appointmentController");

router.post("/book", book);
router.get("/", getAppointments);

module.exports = router;
