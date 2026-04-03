const router = require("express").Router();
const { getDoctors, applyDoctor } = require("../controllers/doctorController");

router.get("/", getDoctors);
router.post("/apply", applyDoctor);

module.exports = router;
