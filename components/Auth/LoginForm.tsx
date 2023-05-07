import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    try {
      const user = { email, password };
  
      const response = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
        callbackUrl: '/',
      }) as any;
  
      if (response.error) {
        console.error('Error:', response.error);
        alert(`Error: ${response.error}`);
      } else {
        console.log('response', response);
        router.push('/');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">

      <div className="w-full flex justify-center mb-[18px]">
        <img className='h-[207px] w-[276px]' src='images/app-logo.png' />
      </div>

      <div className='max-w-sm w-full flex flex-col items-center z-[9]'>

        <div className="text-xl font-semibold">Login to your Account</div>

        <div className="flex flex-col justify-center min-w-[255px]">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden"
          >

            <div className="mb-4 mt-6 relative">
              <input
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>

            <div className="mb-[1px] mt-6 relative">

              <input
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>

            </div>

            <div className='flex justify-end'>
              <a
                className="text-[13.5px] leading-[23px] text-[#7B7B7B]"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-[43px] mt-[27px] mb-[12px]"
            >
              Login
            </button>

            <p className="mb-[27px]">
              <span className='text-[#7B7B7B]'>Don't have an account?</span>{' '}
              <Link href="/signup">
                <span className="text-[#38A8BF]">Sign Up</span>
              </Link>
            </p>

          </form>

          {/* TODO: Add the below code back when we add third=party signup */}
          {/* <div className='flex items-center'>
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

export default LoginForm;
