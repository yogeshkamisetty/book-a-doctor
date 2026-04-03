const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Report = require("../models/Report");

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const allowedMime = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg"
]);

exports.uploadReportMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMime.has(file.mimetype)) {
      return cb(new Error("Only PDF/PNG/JPG files are allowed"));
    }
    cb(null, true);
  }
}).single("report");

exports.uploadReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    const fileUrl = `/uploads/${req.file.filename}`;
    const report = await Report.create({
      userId,
      fileUrl,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    return res.status(201).json({ message: "Report uploaded", report });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to upload report" });
  }
};

exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(reports);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load reports" });
  }
};

exports.getAllReports = async (_req, res) => {
  try {
    const reports = await Report.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name email role");
    return res.json(reports);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load reports" });
  }
};

