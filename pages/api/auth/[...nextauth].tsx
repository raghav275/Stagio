import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@actions/auth";
import { User } from "@typings/profile";
import { toast } from "react-toastify";

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
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ): Promise<
        | Omit<{ token: string; data: User }, "id">
        | { id?: string | undefined }
        | null
      > {
        // Add logic here to look up the user from the credentials supplied
        const res = await login(credentials?.email!, credentials?.password!);
        if (res) {
          var user = { token: res.token, data: res.user };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "/7VjDysz/ziDMXchMFHODM9X/xBfnCnpu5IX6aFLO1w=",
  debug: true,
  session: {
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.token = user.token);
      user && (token.user = user.data);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.token = token.token;
      return session;
    },
  },
});
