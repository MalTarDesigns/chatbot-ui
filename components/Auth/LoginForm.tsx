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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-sm text-center">
            Dont have an account?{' '}
            <Link href="/signup">
              <span className="underline hover:text-blue-700">Sign up</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
