// Mock Database for Development Testing
// This provides test data when MongoDB is not available

const mockDB = {
  users: [
    {
      _id: 'user_1',
      name: 'John Patient',
      email: 'patient@example.com',
      password: '$2a$10$...',  // "pass123" hashed
      phone: '+1234567890',
      role: 'patient',
      createdAt: new Date(),
    },
    {
      _id: 'user_2',
      name: 'Dr. Sarah Smith',
      email: 'doctor@example.com',
      password: '$2a$10$...',  // "pass123" hashed
      phone: '+1987654321',
      role: 'doctor',
      createdAt: new Date(),
    },
    {
      _id: 'user_3',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2a$10$...',  // "pass123" hashed
      phone: '+1111111111',
      role: 'admin',
      createdAt: new Date(),
    }
  ],
  
  doctors: [
    {
      _id: 'doc_1',
      userId: 'user_2',
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      experience: 10,
      qualifications: ['MBBS', 'MD Cardiology'],
      consultationFee: 500,
      rating: 4.8,
      reviewCount: 45,
      verified: true,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00' },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
        { day: 'Friday', startTime: '09:00', endTime: '17:00' },
      ],
      createdAt: new Date(),
    },
    {
      _id: 'doc_2',
      userId: 'user_2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Orthopedics',
      experience: 15,
      qualifications: ['MBBS', 'MS Orthopedics'],
      consultationFee: 600,
      rating: 4.6,
      reviewCount: 32,
      verified: true,
      availability: [
        { day: 'Tuesday', startTime: '10:00', endTime: '18:00' },
        { day: 'Thursday', startTime: '10:00', endTime: '18:00' },
        { day: 'Saturday', startTime: '09:00', endTime: '14:00' },
      ],
      createdAt: new Date(),
    },
  ],

  appointments: [
    {
      _id: 'apt_1',
      patientId: 'user_1',
      doctorId: 'doc_1',
      date: new Date(Date.now() + 86400000),
      timeSlot: '10:00 AM',
      reason: 'Routine checkup',
      consultationType: 'video',
      status: 'confirmed',
      createdAt: new Date(),
    }
  ],

  reports: []
};

export const getMockUser = (email) => {
  return mockDB.users.find(u => u.email === email);
};

export const getMockDoctors = () => {
  return mockDB.doctors;
};

export const getMockAppointments = (userId) => {
  return mockDB.appointments.filter(a => a.patientId === userId);
};

export default mockDB;
