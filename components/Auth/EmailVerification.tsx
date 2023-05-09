import { useEffect, useState } from "react";
import Link from 'next/link';

import AuthService from '@/services/authService';

const EmailVerifiation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailToBeVerified, setEmailToBeVerified] = useState('');
  const authService = new AuthService();

  useEffect(() => {
    const emailToBeVerified = localStorage.getItem('emailToBeVerified');
    if (emailToBeVerified && typeof emailToBeVerified === 'string' && authService.isEmailValid(emailToBeVerified)) {
      setEmailToBeVerified(emailToBeVerified);
    }
    localStorage.removeItem('emailToBeVerified');
  }, []);

  const resendVerificationLink = async () => {
    if (emailToBeVerified) {
      setIsLoading(true);
      await authService.resendVerification(emailToBeVerified);
      setIsLoading(false);
      alert('Email verification link has been sent successfully!');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">
        <div className="w-full flex justify-center mb-[18px]">
          <img className="h-[207px] w-[276px]" src="images/app-logo.png" />
        </div>

        <div className="max-w-sm w-full flex flex-col items-center">
          <div className="text-xl font-semibold">Verify your Email</div>

          <div className="flex flex-col justify-center items-center min-w-[255px]">
            <img className="my-[30px] w-[73px] h-auto" src="/images/paper-plane.svg" />

            <div className="text-center text-[#7B7B7B] text-[13.5px] leading-[23px] max-w-[290px]">
              A verification email has been sent to your email. Please check your mailbox to verify the account before you sign in.
            </div>

            <Link className="mt-[40px] mb-[20px] w-[255px]" href='/login'>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-[43px]"
              >
                Login
              </button>
            </Link>

            <div className="text-[#7B7B7B] text-[13.5px]">
              Didn't receive the email?{' '}<span onClick={(e) => resendVerificationLink()} className="text-[#38A8BF] cursor-pointer">Resend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifiation;
