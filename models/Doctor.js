const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    specialization: { type: String, required: true, trim: true },
    fees: { type: Number, required: true, min: 0 },
    isApproved: { type: Boolean, default: false },
    availability: {
      type: [String],
      default: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30"
      ]
    }
  },
  { timestamps: true }
);

// Helpful for admin lists (pending/approved).
doctorSchema.index({ isApproved: 1 });

module.exports = mongoose.model("Doctor", doctorSchema);
