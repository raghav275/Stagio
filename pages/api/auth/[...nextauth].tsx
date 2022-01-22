import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@actions/auth";
import { User } from "@typings/profile";
import {Session} from 'next-auth'
import {JWT} from 'next-auth/jwt'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:Record<"email" | "password", string> | undefined, req) :Promise<Omit<User, "id"> | { id?: string | undefined; } | null>{
        // Add logic here to look up the user from the credentials supplied
        const res = await login(credentials?.email!,credentials?.password!);
        if (res) {
          return res.user;
        } else {
          return null;
        }
      },
    }),
  ],
  // adapter: MongoDBAdapter(clientPromise),
  secret: "/7VjDysz/ziDMXchMFHODM9X/xBfnCnpu5IX6aFLO1w=",
  debug: true,
  session:{
    maxAge: 3 * 24 * 60 * 60
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
});
