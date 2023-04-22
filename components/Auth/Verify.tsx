import { useState } from "react";
import { useRouter } from "next/router";

const VerifyPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // TODO: Call the API to verify the user
    // const response = await fetch("/api/verify");

    // if (response.ok) {
    //   router.push("/login");
    // } else {
    //   const errorData = await response.json();
    //   setError(errorData.message);
    // }

    // This is just a placeholder until we implement the real functionality
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleVerify}
          className="bg-white rounded-lg overflow-hidden shadow-xl p-8"
        >
          <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && (
            <p className="text-red-500 mb-4">
              An error occurred: {error}
            </p>
          )}
          <p>
            Thank you for registering! We've sent an email to the address you
            provided. Please click the verification link in the email to confirm
            your account.
          </p>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            disabled={isLoading}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
