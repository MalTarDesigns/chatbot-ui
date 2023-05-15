import { useState } from 'react';

import Link from 'next/link';
import router from 'next/router';

import AuthService from '@/services/authService';

const RegisterForm = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authService = new AuthService();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Error: Passwords do not match');
      return;
    }

    try {
      await authService.signUp({ name, email, password });
      alert('Registration successful!');
      router.push('email-verification');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">
      <div className="w-full flex justify-center mb-[18px]">
        <img className="h-[207px] w-[276px]" src="images/app-logo.png" />
      </div>

      <div className="max-w-sm w-full flex flex-col items-center z-[9]">
        <div className="text-xl font-semibold">Create your Account</div>

        <div className="flex flex-col justify-center min-w-[255px]">
          <form onSubmit={handleSubmit} className="overflow-hidden">
            <div className="mb-4 mt-6 relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Name"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Name
              </label>
            </div>

            <div className="mb-4 mt-6 relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>

            <div className="mb-4 mt-6 relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            <div className="mb-6 mt-6 relative">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-[43px]"
            >
              Sign Up
            </button>
            <p className="mt-4">
              <span className="text-[#7B7B7B]">Already have an account?</span>{' '}
              <Link href="/login">
                <span className="text-[#38A8BF]">Login</span>
              </Link>
            </p>
          </form>

          {/* TODO: Add the below code back when we add third=party signup */}
          {/* <div className='flex items-center mt-2'>
            <div className='border-b border-[#CECECE] grow'></div>
            <div className='text-[#7B7B7B] pl-[7px] pr-[7px]'>or Sign up with</div>
            <div className='border-b border-[#CECECE] grow'></div>
          </div> */}
          {/* <div className='flex gap-x-4 justify-center mt-2'>
            <div className='flex h-[41px] w-[41px] border border-[#C8C8C8] justify-center items-center rounded-[50%]'>
              <img src='/images/google.svg' />
            </div>

            <div className='flex h-[41px] w-[41px] border border-[#C8C8C8] justify-center items-center rounded-[50%]'>
              <img src='/images/facebook.svg' />
            </div>

            <div className='flex h-[41px] w-[41px] border border-[#C8C8C8] justify-center items-center rounded-[50%]'>
              <div>
                <img className='relative right-[-8px]' src='/images/leaf.svg' />
                <img src='/images/apple.svg' />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
