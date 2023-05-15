import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import AuthService from "@/services/authService";

const VerifyEmail = () => {
  const router = useRouter();
  const { verificationCode } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();

  const verifyEmail = async () => {
    if (verificationCode && typeof verificationCode === 'string') {
      setIsLoading(true);
      try {
        const response = await authService.verifyEmail(verificationCode);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
      alert('Email verified successfully!');
      router.push('/login');
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [verificationCode]);

  return (
    <div></div>
  );
};

export default VerifyEmail;