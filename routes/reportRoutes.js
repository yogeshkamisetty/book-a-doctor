const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  uploadReportMiddleware,
  uploadReport,
  getMyReports,
  getAllReports
} = require("../controllers/reportController");

router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("user", "doctor", "admin"),
  (req, res, next) => {
    uploadReportMiddleware(req, res, (err) => {
      if (err) return res.status(400).json({ msg: err.message || "Upload failed" });
      return next();
    });
  },
  uploadReport
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("user", "doctor", "admin"),
  getMyReports
);

router.get("/", authMiddleware, roleMiddleware("admin"), getAllReports);

module.exports = router;

