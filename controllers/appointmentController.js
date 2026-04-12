import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason, consultationType } = req.body;

    if (!doctorId || !date || !timeSlot || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify doctor exists and is approved
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId: req.user.userId,
      doctorId,
      date: new Date(date),
      timeSlot,
      reason,
      consultationType: consultationType || 'in-person'
    });

    const populatedAppointment = await appointment.populate([
      { path: 'patientId', select: 'name email phone' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
    ]);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: populatedAppointment
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({ message: error.message || 'Failed to book appointment' });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { patientId: req.user.userId };
    
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'specialization consultationFee')
      .populate('patientId', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Appointment.countDocuments(query);

    res.json({
      appointments,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointments' });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.patientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: error.message || 'Failed to cancel appointment' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify doctor owns this appointment
    const doctor = await Doctor.findById(appointment.doctorId);
    if (doctor.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    appointment.status = status;
    if (notes) {
      appointment.notes = notes;
    }

    await appointment.save();

    res.json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: error.message || 'Failed to update appointment' });
  }
};

export default {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  updateAppointmentStatus
};
