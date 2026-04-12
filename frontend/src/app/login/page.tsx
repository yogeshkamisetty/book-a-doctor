'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Mail, Lock, Loader } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Get the Doctor</h1>
          <p className='text-gray-600 text-sm mt-2'>Healthcare at your fingertips</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
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

          {/* Forgot Password */}
          <div className='text-right'>
            <Link href='/forgot-password' className='text-sm text-blue-600 hover:text-blue-700'>
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loginMutation.isPending}
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {loginMutation.isPending && <Loader className='w-4 h-4 animate-spin' />}
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className='my-6 flex items-center gap-4'>
          <div className='flex-1 bg-gray-300 h-px' />
          <span className='text-gray-500 text-sm'>Or</span>
          <div className='flex-1 bg-gray-300 h-px' />
        </div>

        {/* Sign Up Link */}
        <p className='text-center text-gray-600'>
          Don't have an account?{' '}
          <Link href='/register' className='text-blue-600 font-semibold hover:text-blue-700'>
            Sign up
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs'>
          <p className='font-semibold text-blue-900 mb-2'>Demo Credentials:</p>
          <p className='text-blue-800'>Patient: patient@example.com / pass123</p>
          <p className='text-blue-800'>Doctor: doctor@example.com / pass123</p>
          <p className='text-blue-800'>Admin: admin@example.com / pass123</p>
        </div>
      </div>
    </div>
  );
}
