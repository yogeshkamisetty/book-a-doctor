import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    date: {
      type: Date,
      required: [true, 'Please provide appointment date']
    },
    timeSlot: {
      type: String,
      required: [true, 'Please provide time slot'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
    },
    reason: {
      type: String,
      required: [true, 'Please provide reason for appointment'],
      maxlength: [300, 'Reason cannot exceed 300 characters']
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    notes: {
      type: String,
      default: null
    },
    meetingLink: {
      type: String,
      default: null
    },
    consultationType: {
      type: String,
      enum: ['in-person', 'video', 'phone'],
      default: 'in-person'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Compound index to prevent double-booking
appointmentSchema.index(
  { doctorId: 1, date: 1, timeSlot: 1 },
  { unique: true, sparse: true, partialFilterExpression: { status: { $ne: 'cancelled' } } }
);

// Other indexes
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ doctorId: 1 });
appointmentSchema.index({ date: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
