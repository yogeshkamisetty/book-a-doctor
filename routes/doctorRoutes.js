import express from 'express';
import {
  applyAsDoctor,
  getDoctors,
  getDoctorById,
  updateDoctorAvailability,
  getDoctorAppointments
} from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Doctor routes
router.post('/apply', authMiddleware, applyAsDoctor);
router.put('/availability', authMiddleware, roleMiddleware('doctor'), updateDoctorAvailability);
router.get('/my-appointments', authMiddleware, roleMiddleware('doctor'), getDoctorAppointments);

export default router;
