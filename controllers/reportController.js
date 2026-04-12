import Report from '../models/Report.js';
import Appointment from '../models/Appointment.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadReport = async (req, res) => {
  try {
    const { appointmentId, reportType, description } = req.body;

    if (!req.file || !reportType) {
      return res.status(400).json({ message: 'File and report type are required' });
    }

    let report = await Report.create({
      patientId: req.user.userId,
      appointmentId: appointmentId || null,
      reportType,
      fileName: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      description: description || ''
    });

    report = await report.populate('patientId', 'name email');

    res.status(201).json({
      message: 'Report uploaded successfully',
      report
    });
  } catch (error) {
    console.error('Upload report error:', error);
    
    // Delete uploaded file if there's an error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.error('Error deleting file:', e);
      }
    }

    res.status(500).json({ message: error.message || 'Failed to upload report' });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const reports = await Report.find({ patientId: req.user.userId })
      .populate('appointmentId', 'date status')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ uploadedAt: -1 });

    const total = await Report.countDocuments({ patientId: req.user.userId });

    res.json({
      reports,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch reports' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.patientId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this report' });
    }

    // Delete file from system
    try {
      const filePath = path.join(process.cwd(), 'uploads', report.fileName);
      await fs.unlink(filePath);
    } catch (e) {
      console.error('Error deleting file:', e);
    }

    await Report.findByIdAndDelete(req.params.id);

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: error.message || 'Failed to delete report' });
  }
};

export const shareReportWithDoctor = async (req, res) => {
  try {
    const { doctorId, isPublic } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        isPublic: isPublic !== undefined ? isPublic : true,
        doctorId: doctorId || null
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({
      message: 'Report sharing updated',
      report
    });
  } catch (error) {
    console.error('Share report error:', error);
    res.status(500).json({ message: error.message || 'Failed to share report' });
  }
};

export default {
  uploadReport,
  getMyReports,
  deleteReport,
  shareReportWithDoctor
};
