import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

export const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('userId', 'name email phone isApproved')
      .sort({ createdAt: -1 });

    const pending = doctors.filter(d => !d.userId.isApproved);

    res.json(pending);
  } catch (error) {
    console.error('Get pending doctors error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch pending doctors' });
  }
};

export const approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const user = await User.findByIdAndUpdate(
      doctor.userId,
      {
        isApproved: true,
        role: 'doctor'
      },
      { new: true }
    );

    res.json({
      message: 'Doctor approved successfully',
      user
    });
  } catch (error) {
    console.error('Approve doctor error:', error);
    res.status(500).json({ message: error.message || 'Failed to approve doctor' });
  }
};

export const rejectDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Delete doctor profile
    await Doctor.findByIdAndDelete(doctorId);

    // Reset user role
    await User.findByIdAndUpdate(doctor.userId, {
      role: 'user',
      isApproved: true
    });

    res.json({ message: 'Doctor application rejected' });
  } catch (error) {
    console.error('Reject doctor error:', error);
    res.status(500).json({ message: error.message || 'Failed to reject doctor' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;

    const query = {};
    if (role) query.role = role;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch users' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

    const appointmentsThisMonth = await Appointment.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    res.json({
      stats: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        completedAppointments,
        appointmentsThisMonth,
        pendingDoctors: await Doctor.countDocuments()
          .then(async (count) => {
            const doctors = await Doctor.find()
              .populate('userId', 'isApproved');
            return doctors.filter(d => !d.userId.isApproved).length;
          })
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch statistics' });
  }
};

export default {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getAllUsers,
  getDashboardStats
};
