import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: {
          label: "شماره موبایل",
          type: "text",
          placeholder: "0912-000-0000",
        },
        otp_code: { label: "کد", type: "text", placeholder: "0-0-0-0" },
      },

      async authorize(credentials) {
        if (!credentials?.mobile || !credentials.otp_code) {
          return null;
        }

        const authLogin = await fetch(`${process.env.API_URL}/auth/login/otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: credentials.mobile,
            otp_code: credentials.otp_code,
          }),
        });

        const res = await authLogin.json();

        const { user, access_token } = res.data;

        return { ...user, access_token };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.access_token = token.access_token;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
