const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: String,
  specialization: String,
  fees: Number,
  isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Doctor", doctorSchema);
