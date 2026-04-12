import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Doctor from './models/Doctor.js';

dotenv.config({ path: '.env.local' });

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Doctor.deleteMany({});

    // Create sample users and doctors
    const sampleDoctors = [
      {
        name: 'Dr. Sarah Anderson',
        email: 'sarah.anderson@example.com',
        password: 'password123',
        role: 'doctor',
        phone: '+1-555-0101',
        isApproved: true,
        specialization: 'Cardiology',
        experience: 12,
        consultationFee: 150,
        bio: 'Board-certified cardiologist with 12 years of experience in cardiovascular diseases.',
        qualifications: ['MD Cardiology', 'Fellowship in Interventional Cardiology']
      },
      {
        name: 'Dr. John Smith',
        email: 'john.smith@example.com',
        password: 'password123',
        role: 'doctor',
        phone: '+1-555-0102',
        isApproved: true,
        specialization: 'Dermatology',
        experience: 8,
        consultationFee: 120,
        bio: 'Experienced dermatologist specializing in skin conditions and cosmetic treatments.',
        qualifications: ['MD Dermatology', 'Board Certified']
      },
      {
        name: 'Dr. Emily Johnson',
        email: 'emily.johnson@example.com',
        password: 'password123',
        role: 'doctor',
        phone: '+1-555-0103',
        isApproved: true,
        specialization: 'General Practice',
        experience: 15,
        consultationFee: 100,
        bio: 'Compassionate general practitioner with extensive experience in patient care.',
        qualifications: ['MD General Medicine', 'MPH']
      },
      {
        name: 'Dr. Michael Chen',
        email: 'michael.chen@example.com',
        password: 'password123',
        role: 'doctor',
        phone: '+1-555-0104',
        isApproved: true,
        specialization: 'Orthopedics',
        experience: 10,
        consultationFee: 160,
        bio: 'Orthopedic surgeon with expertise in joint replacement and sports medicine.',
        qualifications: ['MD Orthopedic Surgery', 'Fellowship in Sports Medicine']
      },
      {
        name: 'Dr. Lisa Watson',
        email: 'lisa.watson@example.com',
        password: 'password123',
        role: 'doctor',
        phone: '+1-555-0105',
        isApproved: true,
        specialization: 'Pediatrics',
        experience: 11,
        consultationFee: 110,
        bio: 'Dedicated pediatrician caring for children\'s health and development.',
        qualifications: ['MD Pediatrics', 'Board Certified Pediatrician']
      }
    ];

    // Create doctors
    for (const doctorData of sampleDoctors) {
      const { specialization, experience, consultationFee, bio, qualifications, ...userData } = doctorData;
      
      const user = await User.create(userData);
      
      await Doctor.create({
        userId: user._id,
        specialization,
        experience,
        consultationFee,
        bio,
        qualifications
      });
    }

    // Create sample patients
    const samplePatients = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1-555-0201'
      },
      {
        name: 'Bob Williams',
        email: 'bob@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1-555-0202'
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1-555-0203'
      }
    ];

    await User.create(samplePatients);

    // Create admin
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1-555-0300',
      isApproved: true
    });

    console.log('✅ Database seeded successfully!');
    console.log('\nSample Credentials:');
    console.log('👨‍⚕️ Doctor: sarah.anderson@example.com / password123');
    console.log('👤 Patient: alice@example.com / password123');
    console.log('👨‍💼 Admin: admin@example.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
