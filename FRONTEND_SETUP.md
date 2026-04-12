# 🎨 Get the Doctor - Frontend Setup Guide

## ✅ Frontend Status: Phase 1 Complete

**Build Timestamp:** April 12, 2026
**Framework:** Next.js 14 + TypeScript + Tailwind CSS
**State:** Production-Ready Foundation

---

## 🚀 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Homepage
│   │   ├── login/page.tsx        ← Login page
│   │   ├── register/page.tsx     ← Registration page
│   │   ├── dashboard/page.tsx    ← User dashboard (role-based)
│   │   ├── layout.tsx            ← Root layout with providers
│   │   ├── providers.tsx         ← Query + Toast providers
│   │   └── globals.css           ← Global styles
│   ├── components/
│   │   └── ProtectedRoute.tsx    ← Route protection middleware
│   ├── hooks/
│   │   ├── useAuth.ts            ← Login, register, logout
│   │   ├── useDoctor.ts          ← Doctor operations
│   │   ├── useAppointment.ts     ← Appointment operations
│   │   ├── useReport.ts          ← Medical documents
│   │   └── useAdmin.ts           ← Admin operations
│   ├── services/
│   │   ├── auth-service.ts       ← Authentication API
│   │   ├── doctor-service.ts     ← Doctor browsing & management
│   │   ├── appointment-service.ts ← Booking & management
│   │   ├── report-service.ts     ← Document upload & sharing
│   │   ├── admin-service.ts      ← Admin operations
│   │   ├── firebase-service.ts   ← Push notifications
│   │   ├── razorpay-service.ts   ← Payment processing
│   │   ├── agora-service.ts      ← Video consultations
│   │   ├── socket-service.ts     ← Real-time messaging
│   │   └── notification-service.ts ← Email & SMS
│   ├── lib/
│   │   ├── api-client.ts         ← Axios instance with interceptors
│   │   └── auth-storage.ts       ← Token management
│   ├── store/
│   │   └── index.ts              ← Zustand auth, UI, filter stores
│   ├── types/
│   │   └── index.ts              ← TypeScript interfaces
│   └── public/
├── .env.local                     ← Environment variables (local)
├── .env.example                   ← Environment template
├── package.json                   ← Dependencies
├── tsconfig.json                  ← TypeScript config
├── tailwind.config.ts             ← Tailwind configuration
└── next.config.ts                 ← Next.js configuration
```

---

## 📦 Installed Dependencies

### Core Framework
- **next** (14.0+) - React framework
- **react** (18.3+) - UI library
- **typescript** - Type safety

### State Management & Data
- **zustand** - Lightweight state management
- **@tanstack/react-query** - Server state management & caching
- **axios** - HTTP client

### UI & Components
- **tailwindcss** - Utility-first CSS
- **lucide-react** - Beautiful icons
- **react-hot-toast** - Toast notifications
- **date-fns** - Date utilities

### Third-Party Integrations
- **firebase** - Push notifications & real-time DB
- **razorpay** - Payment processing (India)
- **agora-rtc-sdk-ng** - Video consultations
- **socket.io-client** - Real-time messaging
- **twilio** - SMS service (FREE TIER)
- **sendgrid** - Email service (FREE TIER)
- **react-qr-code** - QR code generation

### Forms & Validation
- **react-hook-form** - Form handling
- **zod** - Schema validation
- **@hookform/resolvers** - Form resolvers

### Authentication
- **next-auth** - Authentication library
- **js-cookie** - Cookie management

---

## 🔧 Environment Configuration

Create `.env.local` in `frontend/` directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Firebase (Push Notifications - FREE TIER)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key

# Razorpay (Payment - India FREE)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Agora (Video Calls - FREE TIER: 10,000 min/month)
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id

# Twilio (SMS - FREE TIER)
NEXT_PUBLIC_TWILIO_ACCOUNT_SID=your_account_sid
NEXT_PUBLIC_TWILIO_AUTH_TOKEN=your_auth_token
NEXT_PUBLIC_TWILIO_PHONE_NUMBER=+91xxxxxxxxxxxx

# SendGrid (Email - FREE TIER: 100 emails/day)
NEXT_PUBLIC_SENDGRID_API_KEY=your_sendgrid_api_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Get the Doctor
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Start Development Server
```bash
npm run dev
```
Access at: `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 Current Pages

### ✅ Implemented

1. **Homepage** (`/`)
   - Features showcase
   - Call-to-action
   - Navigation to login/register

2. **Login** (`/login`)
   - Email & password input
   - Form validation
   - Demo credentials display
   - Redirect to dashboard on success

3. **Register** (`/register`)
   - Full name, email, phone, password
   - Password confirmation
   - Form validation
   - Auto-login after registration

4. **Dashboard** (`/dashboard`)
   - Role-based layout (patient/doctor/admin)
   - Quick access to features
   - User welcome message
   - Navigation cards

### 🔲 To Build (Next Phase)

- **Patient Pages:**
  - `/doctors` - Browse and search doctors
  - `/doctors/:id` - Doctor profile
  - `/book-appointment` - Booking flow
  - `/appointments` - My appointments
  - `/documents` - Medical records

- **Doctor Pages:**
  - `/doctor/profile` - Profile management
  - `/doctor/availability` - Schedule management
  - `/doctor/appointments` - Patient appointments
  - `/doctor/earnings` - Income dashboard

- **Admin Pages:**
  - `/admin/doctors` - Pending approvals
  - `/admin/users` - User management
  - `/admin/stats` - Analytics dashboard
  - `/admin/reports` - System reports

- **Shared Pages:**
  - `/profile` - Profile settings
  - `/messaging` - Direct messaging
  - `/video-call` - Video consultation room
  - `/unauthorized` - Access denied page

---

## 🎨 Design System

### Color Scheme
- **Primary:** Blue (#0066FF)
- **Secondary:** Indigo (#4C63FF)
- **Success:** Green (#10B981)
- **Warning:** Orange (#F59E0B)
- **Error:** Red (#EF4444)
- **Gray:** #F3F4F6 to #111827

### Typography
- **Font:** Geist (sans-serif), Geist Mono (monospace)
- **H1:** 48px (6xl), Bold
- **H2:** 36px (3xl), Bold
- **H3:** 24px (2xl), Semibold
- **Body:** 16px (base), Regular

### Spacing
- Base unit: 4px
- Padding: 4px, 8px, 16px, 24px, 32px, 48px
- Margins: Same as padding
- Border radius: 6px (sm), 8px (md), 12px (lg)

---

## 🔐 Authentication Flow

```
1. User → Registration Page
2. User fills form → POST /api/auth/register
3. Backend validates → Creates User + Returns JWT
4. Frontend stores JWT in httpOnly cookie
5. Zustand stores user data in local state
6. Redirect → Dashboard
```

### Login Flow
```
1. User → Login Page
2. User enters credentials → POST /api/auth/login
3. Backend validates → Returns JWT token
4. Frontend stores token
5. API requests automatically include JWT header
6. 401 response → Redirect to login
```

---

## 🎯 Key Features Architecture

### 1. State Management (Zustand)

**Auth Store:**
```typescript
- user: Current user object
- token: JWT token
- isAuthenticated: Boolean
- setUser(), setToken(), logout()
```

**UI Store:**
```typescript
- darkMode: Boolean
- sidebarOpen: Boolean
- toggleDarkMode(), toggleSidebar()
```

**Filter Store:**
```typescript
- specialization, minRating, priceRange, availability
- setters and resetFilters()
```

### 2. API Client (Axios)

Features:
- Automatic JWT attachment to requests
- 401 error handling (auto-logout)
- Request/response interceptors
- Type-safe with TypeScript

```typescript
// Usage in services:
const response = await apiClient.get('/doctors');
const response = await apiClient.post('/appointments', data);
```

### 3. Custom Hooks (React Query)

Each hook wraps TanStack Query:
```typescript
const { data, isLoading, error } = useDoct ors(filters);
const mutation = useBookAppointment();
await mutation.mutateAsync(appointmentData);
```

### 4. Protected Routes

```typescript
<ProtectedRoute requiredRole={['doctor', 'admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

### Mobile-First Approach
- Design for mobile first
- Use `md:`, `lg:` prefixes for larger screens
- Ensure touch-friendly buttons (min 44x44px)
- Readable font sizes on mobile (16px+)

---

## 🧪 Testing Setup

### Run Tests
```bash
npm run test
```

### Run ESLint
```bash
npm run lint
npm run lint --fix
```

---

## 📊 Performance Optimizations

- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic by Next.js
- **API Caching:** TanStack Query (5min stale time)
- **Bundle Analysis:** `npm run build`

---

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### AWS
- S3 + CloudFront for static files
- API Gateway → Lambda → Backend

### DigitalOcean
- Node.js App Platform
- Auto-deploy from GitHub

---

## 🐛 Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Check token expiry, re-login

### Issue: CORS Error
**Solution:** Verify CORS settings in backend server.js

### Issue: API Not Found
**Solution:** Check NEXT_PUBLIC_API_URL in .env.local

### Issue: Firebase Notifications Not Working
**Solution:** Enable notifications permission, check VAPID key

---

## 📝 Code Conventions

### File Naming
- Pages: `page.tsx`
- Components: `PascalCase.tsx`
- Services: `kebab-case.ts`
- Hooks: `useHookName.ts`

### TypeScript
- Always define types
- Use interfaces for objects
- Avoid `any` type

### Styling
- Use Tailwind classes
- Mobile-first approach
- Consistent spacing units

---

## ✨ Next Steps

**Phase 2: UI Components**
- Build Navbar with auth dropdown
- Doctor browsing cards
- Booking modal
- Filter sidebar
- Appointment list items

**Phase 3: Feature Pages**
- Doctor search & browse
- Appointment booking flow
- Medical documents management
- Messaging interface
- Video call room

**Phase 4: Admin Dashboard**
- User statistics
- Doctor approvals queue
- System analytics
- Report generation

**Phase 5: Third-Party Integration**
- Razorpay payment modal
- Firebase push notifications
- Twilio SMS confirmation
- Agora video consultation
- Socket.io messaging

---

## 💡 Senior Developer Notes

✅ **Architecture Decisions Made:**
- **Next.js** over CRA for SSR, API routes, better SEO
- **Zustand** over Redux for simplicity and performance
- **TanStack Query** for server state with built-in caching
- **TypeScript** for type safety and maintainability
- **Tailwind CSS** for rapid UI development
- **Axios** with interceptors for centralized error handling
- **Free tier services** (Firebase, Razorpay, Agora) for cost efficiency

✅ **Best Practices Implemented:**
- Separation of concerns (services, hooks, components)
- API client with automatic JWT handling
- Protected routes for role-based access
- Environment variables for secrets
- Custom hooks for reusability
- Type-safe API calls with TypeScript

✅ **Scalability:**
- Modular component structure
- Centralized state management
- API layer abstraction
- Easy to add new services
- Database query optimization ready

---

## 📞 Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Firebase Console](https://console.firebase.google.com)
- [Razorpay Docs](https://razorpay.com/docs)

---

**Frontend Status:** 🟢 Phase 1 Complete (Foundation)
**Next Milestone:** UI Components (Phase 2)
**Estimated Timeline:** 3-4 weeks for full implementation

Built with ❤️ by Senior MERN Developer
