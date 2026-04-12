import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

export const applyAsDoctor = async (req, res) => {
  try {
    const { specialization, experience, consultationFee, qualifications, bio } = req.body;

    if (!specialization || experience === undefined || !consultationFee) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if already a doctor
    const existingDoctor = await Doctor.findOne({ userId: req.user.userId });
    if (existingDoctor) {
      return res.status(409).json({ message: 'Already registered as a doctor' });
    }

    // Create doctor profile
    const doctor = await Doctor.create({
      userId: req.user.userId,
      specialization,
      experience: parseInt(experience),
      consultationFee: parseFloat(consultationFee),
      qualifications: qualifications || [],
      bio: bio || ''
    });

    res.status(201).json({
      message: 'Doctor application submitted successfully',
      doctor
    });
  } catch (error) {
    console.error('Apply as doctor error:', error);
    res.status(500).json({ message: error.message || 'Failed to apply as doctor' });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { specialization, search, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (specialization) {
      query.specialization = specialization;
    }

    if (search) {
      // Search in user names and specialization
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');

      query.$or = [
        { userId: { $in: users.map(u => u._id) } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const doctors = await Doctor.find(query)
      .populate('userId', 'name email phone profilePicture')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Doctor.countDocuments(query);

    res.json({
      doctors,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch doctors' });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone profilePicture');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Get upcoming appointments count
    const upcomingAppointments = await Appointment.countDocuments({
      doctorId: doctor._id,
      date: { $gte: new Date() },
      status: { $ne: 'cancelled' }
    });

    res.json({
      ...doctor.toObject(),
      upcomingAppointments
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch doctor' });
  }
};

export const updateDoctorAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    if (!Array.isArray(availability)) {
      return res.status(400).json({ message: 'Availability must be an array' });
    }

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.userId },
      { availability },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.json({
      message: 'Availability updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ message: error.message || 'Failed to update availability' });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.userId });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate('patientId', 'name email phone')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch appointments' });
  }
};

export default {
  applyAsDoctor,
  getDoctors,
  getDoctorById,
  updateDoctorAvailability,
  getDoctorAppointments
};
