import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthService from '../services/authService';

interface AuthContextProps {
  user: any;
  login: (user: { email: string; password: string; }) => Promise<void>;
  signUp: (user: { name: string; email: string; password: string; }) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const authService = new AuthService();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);
  

  const signUp = async (user: { name: string; email: string; password: string; }) => {
    const response = await authService.signUp(user);
    setUser(response);
  };

  const login = async (user: { email: string; password: string; }) => {
    const response = await authService.login(user);
    setUser(response);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  }; 

  const verify = async (token: any) => {
    const response = await authService.verify(token);
    setUser(response);
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const resetPassword = async (token: string, password: string) => {
    await authService.resetPassword(token, password);
  };

  const resendVerification = async (email: string) => {
    await authService.resendVerification(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, forgotPassword, resetPassword, resendVerification, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
