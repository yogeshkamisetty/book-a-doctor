'use client';

import { useAuthStore } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-blue-600'>Get the Doctor</h1>
          <div className='flex gap-4'>
            <Link
              href='/profile'
              className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded'
            >
              <User className='w-5 h-5' />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded'
            >
              <LogOut className='w-5 h-5' />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Welcome Card */}
          <div className='md:col-span-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold mb-2'>Welcome, {user.name}!</h2>
            <p className='text-blue-100'>Role: {user.role.toUpperCase()}</p>
          </div>

          {/* Patient Dashboard */}
          {user.role === 'user' && (
            <>
              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>🏥</div>
                <h3 className='text-lg font-semibold mb-2'>Find Doctors</h3>
                <p className='text-gray-600 mb-4'>Search and book appointments with doctors</p>
                <Link
                  href='/doctors'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  Browse Doctors →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>📅</div>
                <h3 className='text-lg font-semibold mb-2'>My Appointments</h3>
                <p className='text-gray-600 mb-4'>View and manage your appointments</p>
                <Link
                  href='/appointments'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  View Appointments →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>📄</div>
                <h3 className='text-lg font-semibold mb-2'>Medical Records</h3>
                <p className='text-gray-600 mb-4'>Upload and manage your documents</p>
                <Link href='/documents' className='text-blue-600 font-semibold hover:text-blue-700'>
                  View Documents →
                </Link>
              </div>
            </>
          )}

          {/* Doctor Dashboard */}
          {user.role === 'doctor' && (
            <>
              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>👨‍⚕️</div>
                <h3 className='text-lg font-semibold mb-2'>My Profile</h3>
                <p className='text-gray-600 mb-4'>View and update your profile</p>
                <Link
                  href='/doctor/profile'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  Edit Profile →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>📅</div>
                <h3 className='text-lg font-semibold mb-2'>My Appointments</h3>
                <p className='text-gray-600 mb-4'>Manage patient appointments</p>
                <Link
                  href='/doctor/appointments'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  View Appointments →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>⏰</div>
                <h3 className='text-lg font-semibold mb-2'>Availability</h3>
                <p className='text-gray-600 mb-4'>Set your availability schedule</p>
                <Link
                  href='/doctor/availability'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  Manage Schedule →
                </Link>
              </div>
            </>
          )}

          {/* Admin Dashboard */}
          {user.role === 'admin' && (
            <>
              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>⚙️</div>
                <h3 className='text-lg font-semibold mb-2'>Approve Doctors</h3>
                <p className='text-gray-600 mb-4'>Review pending doctor applications</p>
                <Link
                  href='/admin/doctors'
                  className='text-blue-600 font-semibold hover:text-blue-700'
                >
                  Review Applications →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>👥</div>
                <h3 className='text-lg font-semibold mb-2'>Users</h3>
                <p className='text-gray-600 mb-4'>Manage all users on the platform</p>
                <Link href='/admin/users' className='text-blue-600 font-semibold hover:text-blue-700'>
                  View Users →
                </Link>
              </div>

              <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='mb-4 text-4xl'>📊</div>
                <h3 className='text-lg font-semibold mb-2'>Analytics</h3>
                <p className='text-gray-600 mb-4'>Platform statistics and insights</p>
                <Link href='/admin/stats' className='text-blue-600 font-semibold hover:text-blue-700'>
                  View Analytics →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
