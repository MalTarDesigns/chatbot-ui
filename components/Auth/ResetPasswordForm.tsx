import AuthService from '@/services/authService';
import { useRouter } from "next/router";
import { useState } from "react";
import Link from 'next/link';

const ResetPasswordForm = () => {
  const router = useRouter();
  const { resetPasswordCode } = router.query;
  const authService = new AuthService();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordChanged, setShowPasswordChanged] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password don\'t match!');
      return;
    }

    if (resetPasswordCode && typeof resetPasswordCode === 'string') {
      try {
        const response: any = await authService.resetPassword(password, resetPasswordCode);
        if (response.status) {
          setShowPasswordChanged(true);
        }
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">

      <div className="w-full flex justify-center mb-[18px]">
        <img className='h-[207px] w-[276px]' src='/images/app-logo.png' />
      </div>

      {!showPasswordChanged && (
        <div className='max-w-sm w-full flex flex-col items-center'>

          <div className="text-xl font-semibold">Reset Password</div>

          <div className="flex flex-col justify-center min-w-[255px]">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden"
            >

              <div className="mb-4 mt-6 relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="New Password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  New Password
                </label>
              </div>

              <div className="mb-[22px] mt-6 relative">
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
                Reset
              </button>
            </form>
          </div>
        </div>
      )}

      {showPasswordChanged && (
        <div className='max-w-sm w-full flex flex-col items-center'>

          <div className="text-xl font-semibold">Password Changed</div>

          <div className="flex flex-col justify-center items-center min-w-[255px]">

            <img className='my-[25px] w-[55px] h-auto self-center' src='/images/lock.svg' />

            <div className='text-center w-[290px] text-[13.5px] text-[#7B7B7B] leading-[23px]'>
              Your password has been successfully changed
            </div>

            <Link className="mt-[25px] w-[255px]" href='/login'>
              <button
                className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-[43px]"
              >
                Login
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
