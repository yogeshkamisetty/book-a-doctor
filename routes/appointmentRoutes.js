import express from 'express';
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('user'), bookAppointment);
router.get('/', authMiddleware, getMyAppointments);
router.delete('/:id', authMiddleware, roleMiddleware('user'), cancelAppointment);
router.put('/:id', authMiddleware, roleMiddleware('doctor'), updateAppointmentStatus);

export default router;
