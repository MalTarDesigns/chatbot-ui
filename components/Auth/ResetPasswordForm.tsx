import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ResetPasswordForm = () => {
  const router = useRouter();
  // const { token } = router.query;
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      if (resetPassword) {
        const token = 'test'
        await resetPassword(token, password);
        alert("Password reset successful!");
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg overflow-hidden shadow-xl p-8"
        >
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
