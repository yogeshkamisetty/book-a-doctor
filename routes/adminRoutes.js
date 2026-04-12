import express from 'express';
import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getAllUsers,
  getDashboardStats
} from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, roleMiddleware('admin'));

router.get('/pending-doctors', getPendingDoctors);
router.post('/approve-doctor/:doctorId', approveDoctor);
router.post('/reject-doctor/:doctorId', rejectDoctor);
router.get('/users', getAllUsers);
router.get('/stats', getDashboardStats);

export default router;
