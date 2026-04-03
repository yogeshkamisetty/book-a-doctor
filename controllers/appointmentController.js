const Appointment = require("../models/Appointment");

exports.book = async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.json({ message: "Booked" });
};

exports.getAppointments = async (req, res) => {
  const data = await Appointment.find({ userId: req.query.userId });
  res.json(data);
};
