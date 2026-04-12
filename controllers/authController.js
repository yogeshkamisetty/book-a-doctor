import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import generateToken from '../utils/generateToken.js';
import { getMockUser, getMockDoctors } from '../mockDB.js';
import bcrypt from 'bcryptjs';

const USE_MOCK = process.env.NODE_ENV === 'development';

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, phone } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Mock mode
    if (USE_MOCK) {
      const mockUsers = [
        { _id: 'patient_user', name, email, role: role || 'patient', phone }
      ];
      const user = mockUsers[0];
      const token = generateToken(user._id, user.role);
      
      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role || 'user',
      phone: phone?.trim()
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Mock mode - support demo credentials
    if (USE_MOCK) {
      const normalizedEmail = email.toLowerCase().trim();
      
      // Demo credentials
      if (normalizedEmail === 'patient@example.com' && password === 'pass123') {
        const token = generateToken('patient_user_123', 'patient');
        return res.json({
          message: 'Login successful',
          token,
          user: { id: 'patient_user_123', name: 'John Patient', email, role: 'patient' }
        });
      }
      
      if (normalizedEmail === 'doctor@example.com' && password === 'pass123') {
        const token = generateToken('doctor_user_123', 'doctor');
        return res.json({
          message: 'Login successful',
          token,
          user: { id: 'doctor_user_123', name: 'Dr. Sarah Smith', email, role: 'doctor' }
        });
      }
      
      if (normalizedEmail === 'admin@example.com' && password === 'pass123') {
        const token = generateToken('admin_user_123', 'admin');
        return res.json({
          message: 'Login successful',
          token,
          user: { id: 'admin_user_123', name: 'Admin User', email, role: 'admin' }
        });
      }
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Find user and include password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profilePicture: user.profilePicture,
      isApproved: user.isApproved
    };

    // If doctor, get doctor details
    if (user.role === 'doctor') {
      const doctorData = await Doctor.findOne({ userId: user._id });
      profile = { ...profile, ...doctorData?.toObject() };
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch profile' });
  }
};

export default { register, login, getProfile };
