const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.book = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;

    if (!doctorId || !date || !timeSlot) {
      return res
        .status(400)
        .json({ msg: "doctorId, date, and timeSlot are required" });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    // Only approved doctors can receive bookings.
    const doctor = await Doctor.findOne({ _id: doctorId, isApproved: true });
    if (!doctor) return res.status(404).json({ msg: "Doctor not available" });
    if (Array.isArray(doctor.availability) && !doctor.availability.includes(timeSlot)) {
      return res.status(400).json({ msg: "Doctor is not available for this time slot" });
    }

    const existing = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
      status: { $ne: "cancelled" }
    });
    if (existing) {
      return res.status(409).json({ msg: "Time slot already booked" });
    }

    const appointment = await new Appointment({
      userId,
      doctorId,
      date,
      timeSlot,
      status: "pending"
    }).save();

    return res.status(201).json({ message: "Booked", appointment });
  } catch (err) {
    return res.status(500).json({ msg: "Booking failed" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id;

    let filter = {};
    if (role === "user") {
      filter = { userId };
    } else if (role === "doctor") {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) return res.json([]);
      filter = { doctorId: doctor._id };
    }

    const data = await Appointment.find(filter)
      .sort({ date: 1 })
      .populate("doctorId", "specialization fees isApproved userId")
      .populate("userId", "name email role");

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to load appointments" });
  }
};
