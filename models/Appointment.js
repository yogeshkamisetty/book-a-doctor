const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    // Appointment date in YYYY-MM-DD format (keeps slot logic simple).
    date: { type: String, required: true },
    // Example: "09:30"
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// Prevent double-booking for the same doctor+date+timeslot.
// Partial unique index ignores cancelled appointments.
appointmentSchema.index(
  { doctorId: 1, date: 1, timeSlot: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } }
);

appointmentSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
