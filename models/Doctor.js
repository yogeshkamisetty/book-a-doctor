import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    specialization: {
      type: String,
      required: [true, 'Please provide specialization'],
      enum: [
        'Cardiology',
        'Dermatology',
        'Neurology',
        'Pediatrics',
        'Orthopedics',
        'ENT',
        'General Practice',
        'Psychiatry',
        'Ophthalmology',
        'Dentistry'
      ]
    },
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    consultationFee: {
      type: Number,
      required: [true, 'Please provide consultation fee']
    },
    qualifications: {
      type: [String],
      default: []
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    availability: {
      type: [
        {
          day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          },
          startTime: String,
          endTime: String
        }
      ],
      default: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' }
      ]
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Indexes for faster queries
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ userId: 1 });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
