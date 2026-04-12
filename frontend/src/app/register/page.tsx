'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Phone, Loader } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const registerMutation = useRegister();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name,
        email,
        phone,
        password,
      });
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Get the Doctor</h1>
          <p className='text-gray-600 text-sm mt-2'>Create your account</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='John Doe'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <div className='relative'>
              <Phone className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
              <input
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='+91 9876543210'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 w-5 h-5 text-gray-400' />
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={registerMutation.isPending}
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 mt-6'
          >
            {registerMutation.isPending && <Loader className='w-4 h-4 animate-spin' />}
            {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <p className='text-center text-gray-600 mt-6'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-600 font-semibold hover:text-blue-700'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
