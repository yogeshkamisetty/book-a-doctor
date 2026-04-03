const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: false }).populate(
      "userId",
      "name email role"
    );
    return res.json(doctors);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load pending doctors" });
  }
};

exports.approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    doctor.isApproved = true;
    await doctor.save();

    // Promote user role so role-based access works for doctors later.
    if (doctor.userId) {
      await User.findByIdAndUpdate(doctor.userId, { role: "doctor" });
    }

    return res.json({ message: "Doctor approved", doctor });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to approve doctor" });
  }
};

exports.rejectDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    doctor.isApproved = false;
    await doctor.save();
    if (doctor.userId) {
      await User.findByIdAndUpdate(doctor.userId, { role: "user" });
    }
    return res.json({ message: "Doctor rejected", doctor });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to reject doctor" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("name email role");
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load users" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .sort({ date: 1 })
      .populate("doctorId", "specialization fees isApproved userId")
      .populate("userId", "name email role");
    return res.json(appointments);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Failed to load appointments" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["user", "doctor", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select(
      "name email role"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json({ message: "User role updated", user });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to update user role" });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const [users, doctors, approvedDoctors, appointments] = await Promise.all([
      User.countDocuments({}),
      Doctor.countDocuments({}),
      Doctor.countDocuments({ isApproved: true }),
      Appointment.countDocuments({})
    ]);
    return res.json({
      users,
      doctors,
      approvedDoctors,
      appointments
    });
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load system stats" });
  }
};

