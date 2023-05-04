import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthService from '../services/authService';

interface AuthContextProps {
  user: any;
  login: (user: { email: string; password: string; }) => Promise<void>;
  signUp: (user: { username: string; email: string; password: string; }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const authService = new AuthService();

  const [user, setUser] = useState();
  const router = useRouter();


  const signUp = async (user: any) => {
    const response = await authService.signUp(user);
    setUser(response);
  };

  const login = async (user: { email: string; password: string; }) => {
    const response = await authService.login(user);
    console.log(response)
    setUser(response);
  };

  const logout = async () => {
    // Call the logout API
  };

  const verify = async (token: any) => {
    const response = await authService.verify(token);
    setUser(response);
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const resendVerification = async (email: string) => {
    await authService.resendVerification(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, forgotPassword, resendVerification }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
