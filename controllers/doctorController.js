const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find({ isApproved: true }).populate(
    "userId",
    "name email"
  );
  res.json(doctors);
};

exports.applyDoctor = async (req, res) => {
  try {
    const { specialization, fees } = req.body;
    const feesNumber = Number(fees);
    const specializationNorm = specialization ? String(specialization).trim() : "";
    if (!specializationNorm || fees === undefined || Number.isNaN(feesNumber) || feesNumber < 0) {
      return res
        .status(400)
        .json({ msg: "specialization and fees are required" });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    // One doctor profile per user (unique userId).
    let doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      doctor = new Doctor({
        userId,
        specialization: specializationNorm,
        fees: feesNumber,
        isApproved: false
      });
    } else {
      doctor.specialization = specializationNorm;
      doctor.fees = feesNumber;
      doctor.isApproved = false; // if user reapplies/updates, require approval again
    }

    await doctor.save();
    return res.json({ message: "Applied" });
  } catch (err) {
    return res.status(500).json({ msg: "Doctor application failed" });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return res.status(404).json({ msg: "Doctor profile not found" });

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .sort({ date: 1, timeSlot: 1 })
      .populate("userId", "name email role");
    return res.json(appointments);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load doctor appointments" });
  }
};

exports.getMyAvailability = async (req, res) => {
  try {
    const userId = req.user?.id;
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return res.status(404).json({ msg: "Doctor profile not found" });
    return res.json({ availability: doctor.availability || [] });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load availability" });
  }
};

exports.updateMyAvailability = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { availability } = req.body;

    if (!Array.isArray(availability) || availability.some((s) => typeof s !== "string")) {
      return res.status(400).json({ msg: "availability must be a string array" });
    }

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return res.status(404).json({ msg: "Doctor profile not found" });

    doctor.availability = [...new Set(availability.map((s) => s.trim()).filter(Boolean))];
    await doctor.save();

    return res.json({ message: "Availability updated", availability: doctor.availability });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update availability" });
  }
};
