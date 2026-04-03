const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find({ isApproved: true });
  res.json(doctors);
};

exports.applyDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json({ message: "Applied" });
};
