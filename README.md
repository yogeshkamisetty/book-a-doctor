# Book A Doctor - Complete MERN Stack Application

A modern healthcare booking platform that connects patients with healthcare providers. Users can easily find, schedule, and manage medical appointments with a user-friendly interface.

## 🌟 Features

### For Patients
- 🔍 Browse and search doctors by specialization
- 📅 Book appointments with available time slots
- 📋 Manage appointments (view, reschedule, cancel)
- 📄 Upload and manage medical documents
- ⭐ View doctor ratings and reviews
- 🔒 Secure medical history storage

### For Doctors
- 👨‍⚕️ Create and manage professional profiles
- ⏰ Set availability and manage schedules
- 📊 View patient appointments
- 📝 Update appointment notes and status
- 💰 Manage consultation fees
- 📈 Track patient interactions

### For Administrators
- 👥 Manage user accounts and roles
- ✅ Approve/reject doctor applications
- 📊 Dashboard with statistics
- 📋 Monitor all appointments and activities
- 🔧 System configuration and management

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js (ES6+)
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **File Upload:** Multer
- **CORS:** Express CORS middleware

### Frontend (To be built)
- **Framework:** React 19 with TypeScript
- **State Management:** Redux/Zustand
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS / CSS Modules
- **Routing:** React Router v6

### Tools & Testing
- **API Testing:** Postman
- **Database Management:** MongoDB Compass
- **Version Control:** Git

## 📁 Project Structure

```
book-a-doctor/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── doctorController.js   # Doctor operations
│   ├── appointmentController.js  # Appointment management
│   ├── adminController.js    # Admin operations
│   └── reportController.js   # Medical reports
├── models/
│   ├── User.js              # User schema
│   ├── Doctor.js            # Doctor schema
│   ├── Appointment.js       # Appointment schema
│   └── Report.js            # Medical report schema
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── roleMiddleware.js    # Role-based access control
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── doctorRoutes.js      # Doctor endpoints
│   ├── appointmentRoutes.js # Appointment endpoints
│   ├── adminRoutes.js       # Admin endpoints
│   └── reportRoutes.js      # Report endpoints
├── utils/
│   └── generateToken.js     # JWT token generation
├── scripts/
│   └── seedDemoDoctors.js   # Database seeding
├── uploads/                 # User file uploads
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env.local              # Environment variables (local)
├── .env.example            # Example environment template
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
cd d:\Yogesh\Coding\BookADoctor
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your MongoDB URI
   - Add JWT secret

```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/book-a-doctor
JWT_SECRET=your_secret_key_here
FRONTEND_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. **Seed the database:**
```bash
npm run seed
```

5. **Start the development server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)

### Doctors (`/api/doctors`)
- `GET /` - Browse all doctors
- `GET /:id` - Get doctor details
- `POST /apply` - Apply as doctor
- `PUT /availability` - Update doctor availability
- `GET /my-appointments` - Get doctor's appointments

### Appointments (`/api/appointments`)
- `POST /` - Book appointment
- `GET /` - Get user's appointments
- `DELETE /:id` - Cancel appointment
- `PUT /:id` - Update appointment status

### Admin (`/api/admin`)
- `GET /pending-doctors` - Get pending doctor applications
- `POST /approve-doctor/:doctorId` - Approve doctor
- `POST /reject-doctor/:doctorId` - Reject doctor
- `GET /users` - Get all users
- `GET /stats` - Get dashboard statistics

### Reports (`/api/reports`)
- `POST /` - Upload medical report
- `GET /` - Get user's reports
- `DELETE /:id` - Delete report
- `PUT /:id/share` - Share report with doctor

## 🔐 Authentication & Authorization

### Role-Based Access Control
- **user:** Patient - can book appointments, upload reports
- **doctor:** Can manage profile, availability, appointments
- **admin:** Full system access and management

### JWT Token
- Tokens expire after 7 days
- Include token in `Authorization: Bearer <token>` header

## 📊 Database Schemas

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'doctor', 'admin'],
  phone: String,
  profilePicture: String,
  isApproved: Boolean,
  createdAt: Date
}
```

### Doctor
```javascript
{
  userId: ObjectId (ref: User),
  specialization: String,
  experience: Number,
  consultationFee: Number,
  qualifications: [String],
  bio: String,
  availability: [{day, startTime, endTime}],
  averageRating: Number,
  totalReviews: Number,
  createdAt: Date
}
```

### Appointment
```javascript
{
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  date: Date,
  timeSlot: String,
  reason: String,
  status: ['scheduled', 'completed', 'cancelled'],
  notes: String,
  consultationType: ['in-person', 'video', 'phone'],
  createdAt: Date
}
```

### Report
```javascript
{
  patientId: ObjectId (ref: User),
  appointmentId: ObjectId (ref: Appointment),
  doctorId: ObjectId (ref: User),
  reportType: String,
  fileName: String,
  fileUrl: String,
  description: String,
  isPublic: Boolean,
  uploadedAt: Date
}
```

## 🧪 Testing with Postman

1. **Import endpoints:**
   - Create a new Postman collection
   - Add all API endpoints from the `/api/` routes

2. **Authentication Flow:**
   - Register a new user
   - Login to get JWT token
   - Use token in Authorization header for protected routes

3. **Test Scenarios:**
   - User registration and login
   - Doctor application
   - Appointment booking
   - Admin approval workflow

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Secure file upload validation
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Environment variables for sensitive data
- ✅ MongoDB injection prevention via Mongoose

## 📝 Sample Credentials

After running seed script:

**Doctor:**
- Email: `sarah.anderson@example.com`
- Password: `password123`

**Patient:**
- Email: `alice@example.com`
- Password: `password123`

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

## 🚀 Deployment

### Production Checklist
- [ ] Update MongoDB URI to production cluster
- [ ] Generate strong JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Configure FRONTEND_ORIGIN for production domain
- [ ] Set up database backups
- [ ] Configure email notifications
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure CDN for static files

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support, email support@bookadoctor.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by modern healthcare platforms
- Built with modern web technologies
- Design inspired by MediSync Pro, Medicare, and industry best practices

---

**Ready to build the frontend? Let's create an amazing React TypeScript interface!** 🎨
