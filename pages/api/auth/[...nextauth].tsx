import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@actions/auth";
import { toast } from "react-toastify";
import { JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
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
        ): Promise<Omit<User, "id"> | { id?: string | undefined } | null> {
          // Add logic here to look up the user from the credentials supplied
          const response = await login(
            credentials?.email!,
            credentials?.password!
          );
          const cookies = response.headers["set-cookie"];

          res.setHeader("Set-Cookie", cookies);
          if (response) {
            var user = { token: response.data.token, data: response.data.user };
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
      jwt: async ({ token, user }: { token: JWT; user?: User }) => {
        user && (token.token = user.token);
        user && (token.user = user.data);
        return token;
      },
      session: async ({ session, token }: { session: Session; token: JWT }) => {
        session.user = token.user;
        session.token = token.token;
        return session;
      },
    },
  };
};
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
