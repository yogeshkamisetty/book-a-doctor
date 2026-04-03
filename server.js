const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN
      ? process.env.FRONTEND_ORIGIN.split(",").map((s) => s.trim())
      : true,
    credentials: true
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

async function startServer() {
  try {
    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

startServer();