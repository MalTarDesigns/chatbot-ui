import AuthService from '@/services/authService';
import { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const authService = new AuthService();
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await authService.forgotPassword(email)

    if (response.ok) {
      alert("Password reset email sent!");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white font-helvetica min-h-screen relative justify-center">

      <div className="w-full flex justify-center mb-[18px]">
        <img className='h-[207px] w-[276px]' src='images/app-logo.png' alt="App Logo" />
      </div>

      <div className='max-w-sm w-full flex flex-col items-center'>

        <div className="text-xl font-semibold">Forgot Password?</div>

        <div className="flex flex-col justify-center min-w-[255px]">

          <div className="w-full max-w-[290px] text-[13.5px] text-[#7B7B7B] leading-[23px] text-center mt-[18px]">
            Enter the email address associated with your account and we’ll send you a link to reset your password.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-[23px] mt-[30px] relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default ForgotPasswordForm;
