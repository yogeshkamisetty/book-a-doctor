import express from 'express';
import multer from 'multer';
import {
  uploadReport,
  getMyReports,
  deleteReport,
  shareReportWithDoctor
} from '../controllers/reportController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed'));
    }
  }
});

router.post('/', authMiddleware, upload.single('file'), uploadReport);
router.get('/', authMiddleware, getMyReports);
router.delete('/:id', authMiddleware, deleteReport);
router.put('/:id/share', authMiddleware, shareReportWithDoctor);

export default router;
