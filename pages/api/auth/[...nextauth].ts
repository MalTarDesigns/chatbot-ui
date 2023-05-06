import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '../../../services/authService';

const authService = new AuthService();

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const { email, password } = credentials as any;
    
      try {
        const response = await fetch(`${authService.apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
          const user = await response.json();
          return user;
        } else {
          console.error(`Error during authentication: ${response.status} ${response.statusText}`);
          return null;
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        return null;
      }
    }
  })
];

const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login'
  },
  debug: true,
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      } else {
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user }) {
      return user ? { ...token, ...user } : token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  }
};

export default NextAuth(authOptions);
