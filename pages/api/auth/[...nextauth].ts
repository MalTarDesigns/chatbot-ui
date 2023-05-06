import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '../../../services/authService';

const authService = new AuthService();

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const { email, password } = credentials as any

      const user = await authService.login({ email, password });

      if (user) {
        return user;
      } else {
        return null;
      }
    }
  })
];

export const authOptions: NextAuthOptions = {
  providers: providers,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login'
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // Add custom logic here if needed
        console.log(user);
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom logic here if needed
      console.log(session);
      return session;
    },
  }
};

export default NextAuth(authOptions);
