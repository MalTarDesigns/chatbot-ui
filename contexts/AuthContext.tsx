import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthService from '../services/authService';

interface AuthContextProps {
  user: any;
  login: (user: { username: string; password: string; }) => Promise<void>;
  signUp: (user: { username: string; password: string; }) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const authService = new AuthService();

  const [user, setUser] = useState(null);
  const router = useRouter();


  const signUp = async (user: any) => {
    const response = await authService.signUp(user);
    setUser(response.user);
  };

  const login = async (user: any) => {
    const response = await authService.login(user);
    setUser(response.user);
  };

  const logout = async () => {
    // Call the logout API
  };

  const verify = async (token: any) => {
    const response = await authService.verify(token);
    setUser(response.user);
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
