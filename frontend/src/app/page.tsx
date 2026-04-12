'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store';
import { ArrowRight, Stethoscope, Calendar, FileText, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* Navigation */}
      <nav className='bg-white shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Stethoscope className='w-8 h-8 text-blue-600' />
            <h1 className='text-2xl font-bold text-blue-600'>Get the Doctor</h1>
          </div>
          <div className='flex gap-4'>
            <Link href='/login' className='px-6 py-2 text-gray-700 hover:text-gray-900 font-medium'>
              Login
            </Link>
            <Link
              href='/register'
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center'>
        <h2 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
          Healthcare at Your <span className='text-blue-600'>Fingertips</span>
        </h2>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Connect with qualified healthcare professionals. Book appointments, manage medical records, and
          access telemedicine services—all in one platform.
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
          <Link
            href='/register'
            className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2'
          >
            Get Started
            <ArrowRight className='w-5 h-5' />
          </Link>
          <Link
            href='/doctors'
            className='px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold'
          >
            Browse Doctors
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h3 className='text-3xl font-bold text-center mb-12'>Why Choose Us?</h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center p-6 rounded-lg hover:shadow-lg transition'>
              <div className='mb-4 text-4xl'>🔍</div>
              <h4 className='font-semibold text-lg mb-2'>Easy Search</h4>
              <p className='text-gray-600'>Find doctors by specialization, experience, and ratings</p>
            </div>
            <div className='text-center p-6 rounded-lg hover:shadow-lg transition'>
              <Calendar className='w-12 h-12 mx-auto mb-4 text-blue-600' />
              <h4 className='font-semibold text-lg mb-2'>Quick Booking</h4>
              <p className='text-gray-600'>Schedule appointments instantly with available slots</p>
            </div>
            <div className='text-center p-6 rounded-lg hover:shadow-lg transition'>
              <FileText className='w-12 h-12 mx-auto mb-4 text-blue-600' />
              <h4 className='font-semibold text-lg mb-2'>Medical Records</h4>
              <p className='text-gray-600'>Secure storage for all your health documents</p>
            </div>
            <div className='text-center p-6 rounded-lg hover:shadow-lg transition'>
              <Shield className='w-12 h-12 mx-auto mb-4 text-blue-600' />
              <h4 className='font-semibold text-lg mb-2'>Secure & Private</h4>
              <p className='text-gray-600'>Your health data is encrypted and protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h3 className='text-3xl font-bold mb-6'>Ready to Get Started?</h3>
          <p className='text-xl mb-8 opacity-90'>
            Join thousands of patients getting better healthcare experience
          </p>
          <Link
            href='/register'
            className='inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold'
          >
            Create Your Account Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='mb-2'>&copy; 2026 Get the Doctor. All rights reserved.</p>
          <p className='text-gray-400'>Providing quality healthcare services across Asia/India</p>
        </div>
      </footer>
    </div>
  );
}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
