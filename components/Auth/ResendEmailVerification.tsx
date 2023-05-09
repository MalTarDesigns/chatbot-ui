import { useState } from "react";
import { useRouter } from "next/router";

import AuthService from "@/services/authService";
import Link from "next/link";

const ResendEmailVerification = () => {
  const [emailToBeVerified, setEmailToBeVerified] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResentMessage, setShowResentMessage] = useState(false);
  const router = useRouter();

  const authService = new AuthService();

  const resendVerificationLink = async (event: any) => {
    event.preventDefault();
    if (!authService.isEmailValid(emailToBeVerified)) {
      return alert('Please enter valid email address');
    }
    setIsLoading(true);
    try {
      await authService.resendVerification(emailToBeVerified);     
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      return;
    }
    setIsLoading(false);
    setShowResentMessage(true);
  };

  return (
    <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">

      <div className="w-full flex justify-center mb-[18px]">
        <img className='h-[207px] w-[276px]' src='images/app-logo.png' />
      </div>

      {!showResentMessage && (
        <div className='max-w-sm w-full flex flex-col items-center'>

          <div className="text-xl font-semibold">Resend Verification</div>

          <div className="flex flex-col justify-center min-w-[255px]">
            <form
              onSubmit={resendVerificationLink}
              className="overflow-hidden"
            >

              <div className="mb-[22px] mt-6 relative">
                <input
                  type="email"
                  id="email"
                  value={emailToBeVerified}
                  onChange={(e) => setEmailToBeVerified(e.target.value)}
                  required
                  placeholder="Email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-[43px]"
              >
                Send
              </button>

              <div className="text-[#7B7B7B] text-[13.5px] text-center mt-[18px]">
                Already verified?{' '}<span onClick={(e) => router.push('/login')} className="text-[#38A8BF] cursor-pointer">Login</span>
              </div>

            </form>
          </div>
        </div>
      )}

      {showResentMessage && (
        <div className='max-w-sm w-full flex flex-col items-center'>

          <div className="text-xl font-semibold">Resent Email</div>

          <div className="flex flex-col justify-center items-center min-w-[255px]">

            <img className="my-[30px] w-[73px] h-auto" src="/images/paper-plane.svg" />

            <div className="text-center text-[#7B7B7B] text-[13.5px] max-w-[290px] mb-[43px]">
              A verification email has been resent to your email. Please check your mailbox to verify the account before you sign in.
            </div>

            <button
              className="bg-gradient-to-r from-[#FF5E00] to-[#38A8BF] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full max-w-[255px] h-[43px]"
            >
              <Link href={'/login'}>Login</Link>
            </button>

            <div className="text-[#7B7B7B] text-[13.5px] mt-[18px]">
              Didn't receive the email?{' '}<span onClick={(e) => setShowResentMessage(false)} className="text-[#38A8BF] cursor-pointer">Resend</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ResendEmailVerification;