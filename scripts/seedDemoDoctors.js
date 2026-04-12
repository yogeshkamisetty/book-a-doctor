const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

dotenv.config();

const DEMO_DOCTORS = [
  {
    name: "Aarav Sharma",
    email: "doctor.aarav@example.com",
    specialization: "Cardiology",
    fees: 800,
    availability: ["09:00", "09:30", "10:00", "10:30", "11:00"]
  },
  {
    name: "Priya Mehta",
    email: "doctor.priya@example.com",
    specialization: "Dermatology",
    fees: 600,
    availability: ["11:00", "11:30", "12:00", "12:30", "13:00"]
  },
  {
    name: "Rohan Verma",
    email: "doctor.rohan@example.com",
    specialization: "Neurology",
    fees: 1200,
    availability: ["14:00", "14:30", "15:00", "15:30"]
  }
];

async function upsertDemoDoctor(doc) {
  let user = await User.findOne({ email: doc.email }).select("+password");
  if (!user) {
    const hashedPassword = await bcrypt.hash("Pass@1234", 10);
    user = await User.create({
      name: doc.name,
      email: doc.email,
      password: hashedPassword,
      role: "doctor"
    });
  } else if (user.role !== "doctor") {
    user.role = "doctor";
    await user.save();
  }

  let doctor = await Doctor.findOne({ userId: user._id });
  if (!doctor) {
    doctor = await Doctor.create({
      userId: user._id,
      specialization: doc.specialization,
      fees: doc.fees,
      availability: doc.availability,
      isApproved: true
    });
  } else {
    doctor.specialization = doc.specialization;
    doctor.fees = doc.fees;
    doctor.availability = doc.availability;
    doctor.isApproved = true;
    await doctor.save();
  }
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    for (const doc of DEMO_DOCTORS) {
      await upsertDemoDoctor(doc);
    }
    console.log("Demo doctors seeded successfully.");
  } catch (err) {
    console.error("Failed to seed demo doctors:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();

